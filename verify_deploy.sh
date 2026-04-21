#!/bin/bash
RUN_ID=$1
URL="https://ayushxx7.github.io/mandal-digital-roots/"

echo "⏳ Waiting for run $RUN_ID to complete..."
while true; do
  STATUS=$(gh run view "$RUN_ID" --json status,conclusion)
  S=$(echo $STATUS | jq -r .status)
  C=$(echo $STATUS | jq -r .conclusion)
  
  if [ "$S" == "completed" ]; then
    if [ "$C" == "success" ]; then
      echo "✅ Workflow run successful!"
      break
    else
      echo "❌ Workflow run failed with conclusion: $C"
      exit 1
    fi
  fi
  echo "Still in progress ($S)... waiting 10s"
  sleep 10
done

echo "🔍 Verifying live site at $URL..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$HTTP_STATUS" == "200" ]; then
  echo "🎉 Site is LIVE! (Status: 200)"
else
  echo "⚠️ Site returned status: $HTTP_STATUS. Retrying in 30s for propagation..."
  sleep 30
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  if [ "$HTTP_STATUS" == "200" ]; then
    echo "🎉 Site is LIVE after propagation! (Status: 200)"
  else
    echo "🔴 Site is STILL DOWN or 404. Checking for common issues..."
    exit 1
  fi
fi
