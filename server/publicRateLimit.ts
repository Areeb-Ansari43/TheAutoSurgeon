const WINDOW_MS = 10 * 60 * 1000;
const MAX_IDENTITIES = 10_000;

type LimitOperation = "appointment" | "inquiry";
type Bucket = { timestamps: number[]; lastSeen: number };

const limits: Record<LimitOperation, number> = {
  appointment: 5,
  inquiry: 8,
};

const buckets = new Map<string, Bucket>();

/**
 * Process-local protection for public form endpoints. Identity values are already
 * SHA-256 digests and derive anonymous callers from the direct socket peer (not
 * X-Forwarded-For). Database uniqueness remains the durable duplicate defence.
 */
export function consumePublicMutation(
  operation: LimitOperation,
  identity: string,
  now = Date.now()
): { allowed: boolean; retryAfterSeconds: number } {
  prune(now);
  const key = `${operation}:${identity}`;
  const previous = buckets.get(key) ?? { timestamps: [], lastSeen: now };
  const timestamps = previous.timestamps.filter(timestamp => timestamp > now - WINDOW_MS);

  if (timestamps.length >= limits[operation]) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((timestamps[0]! + WINDOW_MS - now) / 1000)
    );
    buckets.set(key, { timestamps, lastSeen: now });
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  buckets.set(key, { timestamps, lastSeen: now });
  return { allowed: true, retryAfterSeconds: 0 };
}

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.lastSeen <= now - WINDOW_MS) buckets.delete(key);
  }
  if (buckets.size <= MAX_IDENTITIES) return;

  const oldest = [...buckets.entries()]
    .sort(([, left], [, right]) => left.lastSeen - right.lastSeen)
    .slice(0, buckets.size - MAX_IDENTITIES);
  for (const [key] of oldest) buckets.delete(key);
}
