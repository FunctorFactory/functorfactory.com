terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.38.0"
    }

    github = {
      source  = "integrations/github"
      version = "6.0.0"
    }
  }

  backend "s3" {
    bucket = "functor-factory-terraform"
    key    = "functorfactory.com"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.region
}

provider "github" {
  owner = "FunctorFactory"
}

resource "aws_ecr_repository" "ecr" {
  name                 = "functorfactory.com"
  force_delete         = true
  image_tag_mutability = "IMMUTABLE"
}

data "github_repository" "repo" {
  full_name = var.github_repository
}

resource "github_actions_variable" "registry" {
  depends_on = [ data.github_repository.repo, aws_ecr_repository.ecr ]
  repository = data.github_repository.repo.name
  variable_name = "ECR_REGISTRY"
  value = aws_ecr_repository.ecr.name
}

resource "github_actions_variable" "region" {
  depends_on = [ data.github_repository.repo ]
  repository = data.github_repository.repo.name
  variable_name = "AWS_REGION"
  value = var.region
}