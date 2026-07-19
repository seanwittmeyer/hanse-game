#!/usr/bin/env bash
# v31-pressure runner — 6 serial batches × 3 parallel narrate.js processes (4 cores; identical
# contention per batch so within-corpus comparisons stay fair). Budgets = the bulk defaults.
set -u
cd "$(dirname "$0")/.."
node playtests/v31-matrix.js
BATCHES=playtests/logs/v31-pressure/batches.json
N=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$BATCHES')).length)")
for ((b=0;b<N;b++)); do
  echo "== batch $((b+1))/$N =="
  mapfile -t FILES < <(node -e "JSON.parse(require('fs').readFileSync('$BATCHES'))[$b].forEach(f=>console.log(f))")
  pids=()
  for f in "${FILES[@]}"; do
    tag=$(basename "$f" .json)
    MATRIX="$f" OUT=v31-pressure GUILD_MS=120 CELLAR_MS=200 node playtests/narrate.js > "playtests/logs/v31-pressure/run-$tag.log" 2>&1 &
    pids+=($!)
  done
  for p in "${pids[@]}"; do wait "$p"; done
done
echo "all batches done"
