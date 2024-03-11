terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.38.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "FunctorFactory"
    workspaces {
      name = "Website"
    }
  }
}

locals {
  normal_project_name = replace(var.project_name, "/[^a-zA-Z0-9]+/", "-")
}

provider "aws" {
  region = var.region
}

resource "aws_ecr_repository" "ecr" {
  name                 = var.project_name
  force_delete         = true
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecs_cluster" "cluster" {
  name = local.normal_project_name
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "task-role" {
  depends_on = [ data.aws_iam_policy_document.assume_role_policy ]
  name = "${local.normal_project_name}-task-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "task-role-policy" {
  depends_on = [ aws_iam_role.task-role ]
  role       = aws_iam_role.task-role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_task_definition" "task" {
  depends_on = [ aws_iam_role.task-role ]
  family                   = local.normal_project_name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn = aws_iam_role.task-role.arn
  
  container_definitions = <<EOF
  [
    {
      "name": "${local.normal_project_name}",
      "image": "${aws_ecr_repository.ecr.repository_url}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000
        }
      ]
    }
  ]
  EOF
}

resource "aws_default_vpc" "vpc" {}

data "aws_availability_zones" "zones" {
  state = "available"

  filter {
    name = "region-name"
    values = [var.region]
  }
}

resource "aws_default_subnet" "subnets" {
  depends_on = [ data.aws_availability_zones.zones ]
  for_each = toset(data.aws_availability_zones.zones.names)
  availability_zone = each.value
}

data "aws_subnets" "subnets" {
  depends_on = [ aws_default_subnet.subnets ]
  filter {
    name = "vpc-id"
    values = [ aws_default_vpc.vpc.id ]
  }
}

resource "aws_security_group" "lb-sg" {
  name = "${local.normal_project_name}-lb-sg"
}

resource "aws_security_group_rule" "lb-sg-ingress" {
  depends_on = [ aws_security_group.lb-sg ]
  security_group_id = aws_security_group.lb-sg.id
  type = "ingress"
  from_port   = 80
  to_port     = 80
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "lb-sg-egress" {
  depends_on = [ aws_security_group.lb-sg ]
  security_group_id = aws_security_group.lb-sg.id
  type = "egress"
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"] 
}

resource "aws_alb" "lb" {
  depends_on = [ aws_security_group.lb-sg, aws_default_subnet.subnets ]
  name            = "${local.normal_project_name}-lb"
  load_balancer_type = "application"
  security_groups = [aws_security_group.lb-sg.id]
  subnets = [ for subnet in aws_default_subnet.subnets : subnet.id ]
}

resource "aws_lb_target_group" "tg" {
  depends_on = [ aws_alb.lb ]
  name     = "${local.normal_project_name}-tg"
  port     = 80
  protocol = "HTTP"
  target_type = "ip"
  vpc_id   = aws_default_vpc.vpc.id
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_alb.lb.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.tg.arn
  }
}

resource "aws_ecs_service" "ecs" {
  name = local.normal_project_name
  cluster = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task.arn
  launch_type = "FARGATE"
  desired_count = 1

  network_configuration {
    subnets = [ for subnet in data.aws_subnets.subnets.ids : subnet ]
    security_groups = [aws_security_group.lb-sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.tg.arn
    container_name   = aws_ecs_task_definition.task.family
    container_port   = 3000
  }
}