/**
 * Minimal duration parser for simple strings like "1h", "15m", "7d",
 * "3600s", or a plain number of seconds. Used to translate
 * AUTH_SESSION_EXPIRY into a cookie maxAge (milliseconds), avoiding
 * an extra dependency for a single conversion.
 */
function parseDurationToMs(value, fallbackMs = 60 * 60 * 1000) {
  if (!value) return fallbackMs;

  const match = /^(\d+)\s*(ms|s|m|h|d)?$/i.exec(String(value).trim());
  if (!match) return fallbackMs;

  const amount = Number(match[1]);
  const unit = (match[2] || "s").toLowerCase();

  const unitToMs = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * (unitToMs[unit] || unitToMs.s);
}

module.exports = parseDurationToMs;
