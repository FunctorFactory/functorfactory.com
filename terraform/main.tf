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