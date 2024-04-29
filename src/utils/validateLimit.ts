const MAX_LIMIT = 1000;

export function validateLimit(limit: number): boolean {
  if (!limit) return false;
  if (!Number.isInteger(limit)) return false;
  if (limit < 0 || limit > MAX_LIMIT) return false;

  return true;
}
