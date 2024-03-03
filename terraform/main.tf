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