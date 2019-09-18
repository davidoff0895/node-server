#!/usr/bin/env bash

curl -v -X POST \
  http://localhost:9000/pdf/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  --output "file.pdf" \
  -d '{
    "body": {
        "guest": {
            "firstName": "John",
            "lastName": "Doe"
        }
    },
    "locale": "ru"
}'
