#!/usr/bin/env bash
# Orchestrate the slow AI matchup slate for the game review.
# 5 matchups x {2,3,4}p x 60 games, sharded 15 games x 4 shards, run 4-wide.
# Each shard writes a distinct JSONL event file (SAVE=1 EVENTS_OUT) into playtests/analysis/.
# Budgets throttled for bulk but keep CM >= GM so the strength ordering holds.
set -u
cd "$(dirname "$0")/../.."   # repo root
OUT=playtests/analysis
mkdir -p "$OUT" playtests/review/joblogs
rm -f "$OUT"/mu-*.jsonl playtests/review/joblogs/mu-*.log

export GUILD_MS=45
export CELLAR_MS=70
SHARDS=4
GAMES=15

declare -A MU=(
  [CMvCM]="cellarmaster"
  [CMvGM]="cellarmaster,guildmaster"
  [GMvGM]="guildmaster"
  [CMvTr]="cellarmaster,trader"
  [GMvTr]="guildmaster,trader"
)

JOBS=$(mktemp)
for name in CMvCM CMvGM GMvGM CMvTr GMvTr; do
  tiers="${MU[$name]}"
  for n in 2 3 4; do
    for s in $(seq 1 $SHARDS); do
      f="mu-${name}-${n}p-s${s}.jsonl"
      log="playtests/review/joblogs/mu-${name}-${n}p-s${s}.log"
      echo "TIERS=${tiers} COUNTS=${n} GUILD_MS=${GUILD_MS} CELLAR_MS=${CELLAR_MS} SAVE=1 EVENTS_OUT=${f} node playtests/sim-analyze.js ${GAMES} > ${log} 2>&1" >> "$JOBS"
    done
  done
done

echo "Total shard-jobs: $(wc -l < "$JOBS")  (each $GAMES games; $((SHARDS*GAMES)) games/matchup-count)"
date +"start: %H:%M:%S"
# 4-wide pool
cat "$JOBS" | xargs -P 4 -I CMD bash -c CMD
date +"done:  %H:%M:%S"
rm -f "$JOBS"
echo "ALL MATCHUP SHARDS COMPLETE. JSONL in $OUT/mu-*.jsonl"
ls "$OUT"/mu-*.jsonl | wc -l
