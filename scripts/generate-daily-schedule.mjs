import fs from "node:fs/promises";
import path from "node:path";

const leadersPath = path.join("data", "leaders.json");
const schedulePath = path.join("data", "daily-schedule.json");

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, n) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
}

function shuffle(array, seed = Math.random()) {
  const arr = [...array];
  let s = Math.floor(seed * 1e9) || 1;
  const rand = () => {
    s = (1664525 * s + 1013904223) % 4294967296;
    return s / 4294967296;
  };

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function main() {
  const json = JSON.parse(await fs.readFile(leadersPath, "utf8"));
  const leaders = (json.leaders || json).filter(
    (l) => l.image && l.imageVerified !== false
  );

  const today = new Date();
  const start = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  ));

  const daysToGenerate = 365 * 3;
  const entries = [];
  let dayOffset = 0;
  let cycle = 0;

  while (entries.length < daysToGenerate) {
    const shuffled = shuffle(leaders, 0.12345 + cycle);
    for (const leader of shuffled) {
      if (entries.length >= daysToGenerate) break;
      entries.push({
        date: toIsoDate(addDays(start, dayOffset)),
        leaderId: leader.id
      });
      dayOffset += 1;
    }
    cycle += 1;
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    startDate: entries[0].date,
    endDate: entries[entries.length - 1].date,
    entries
  };

  await fs.writeFile(schedulePath, JSON.stringify(payload, null, 2) + "\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});