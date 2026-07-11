#!/bin/bash
# Run the v3-corpus shards: 6 serial batches x 3 parallel narrate.js processes (4 cores).
cd "$(dirname "$0")/.."
BATCHES=$(node -e "console.log(JSON.parse(require('fs').readFileSync('playtests/logs/v3-corpus/batches.json','utf8')).map(b=>b.join(' ')).join('\n'))")
i=0
while IFS= read -r line; do
  i=$((i+1)); echo "=== batch $i: $line ($(date +%H:%M:%S)) ==="
  for s in $line; do
    MATRIX=playtests/logs/v3-corpus/matrix-$s.json OUT=v3-corpus node playtests/narrate.js > playtests/logs/v3-corpus/shard-$s.out 2>&1 &
  done
  wait
  grep -h 'games (KEY' playtests/logs/v3-corpus/shard-*.out | tail -3
done <<< "$BATCHES"
echo "=== all batches done ($(date +%H:%M:%S)) ==="
grep -l ERROR playtests/logs/v3-corpus/shard-*.out 2>/dev/null || echo "no shard errors"
