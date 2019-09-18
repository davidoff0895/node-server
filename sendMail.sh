#!/usr/bin/env bash

curl -v -X POST \
  http://localhost:9000/mail/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "node@server.com",
    "to": "your@mail.com",
    "subject": "your subject",
    "body": {
    	"guest": {
    		"firstName": "John",
    		"lastName": "Doe"
    	}
    },
    "locale": "en"
}'
