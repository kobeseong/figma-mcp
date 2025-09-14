#!/bin/bash

echo "=== Health API 테스트 ==="
echo "GET 요청:"
curl -X GET http://localhost:3000/api/health \
  -H "Content-Type: application/json" \
  | jq '.'

echo -e "\n=== 응답 헤더 확인 ==="
curl -I http://localhost:3000/api/health
