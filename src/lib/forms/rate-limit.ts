import "server-only";

/**
 * Lightweight per-IP throttle for public forms. In-memory, so it resets on
 * deploy and is per-instance; adequate for Stage 1 enquiry volumes. Swap for
 * Upstash/Redis when the platform (Stage 3) needs shared state.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  bucket.count += 1;
  return { allowed: bucket.count <= limit };
}

export function clientKey(request: Request) {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : request.headers.get("x-real-ip")) ?? "unknown";
}
