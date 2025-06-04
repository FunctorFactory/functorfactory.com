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

###############################################################################
#                                     VPC                                     #
###############################################################################

resource "aws_default_vpc" "vpc" {}

data "aws_availability_zones" "zones" {
  state = "available"

  filter {
    name   = "region-name"
    values = [var.region]
  }
}

resource "aws_default_subnet" "subnets" {
  depends_on        = [data.aws_availability_zones.zones]
  for_each          = toset(data.aws_availability_zones.zones.names)
  availability_zone = each.value
}

data "aws_subnets" "subnets" {
  depends_on = [aws_default_subnet.subnets]
  filter {
    name   = "vpc-id"
    values = [aws_default_vpc.vpc.id]
  }
}

###############################################################################
#                                      S3                                     #
###############################################################################

resource "aws_s3_bucket" "s3" {
  bucket = var.domain
}

resource "aws_s3_bucket_ownership_controls" "controls" {
  bucket = aws_s3_bucket.s3.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "public" {
  bucket = aws_s3_bucket.s3.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.controls,
    aws_s3_bucket_public_access_block.public,
  ]

  bucket = aws_s3_bucket.s3.id
  acl    = "public-read"
}

data "aws_iam_policy_document" "policy" {
  statement {
    sid = "PublicReadGetObject"

    principals {
      type = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.s3.arn,
      "${aws_s3_bucket.s3.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "policy" {
  bucket = aws_s3_bucket.s3.id
  policy = data.aws_iam_policy_document.policy.json
}

###############################################################################
#                                  CloudFront                                 #
###############################################################################

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    origin_id   = "${var.domain}"
    domain_name = aws_s3_bucket.s3.bucket_regional_domain_name
  }

  aliases = ["${var.domain}"]

  enabled             = true
  is_ipv6_enabled = false
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.domain}"

    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress = true

  }

  price_class = "PriceClass_100"

  # This is required to be specified even if it's not used.
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }
}

data "aws_acm_certificate" "cert" {
  domain      = var.domain
  most_recent = true
}

data "aws_route53_zone" "zone" {
  name = var.domain
}

resource "aws_route53_record" "record" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = var.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = "www.${var.domain}"
  ttl = 300
  type    = "CNAME"
  records = [var.domain]
}
