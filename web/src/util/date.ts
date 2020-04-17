export enum DateUnit {
  "DAYS" = "days",
  "DAY" = "day",
  "HOURS" = "hours",
  "HOUR" = "hour",
  "MINUTES" = "minutes",
  "MINUTE" = "minute",
  "SECONDS" = "seconds",
  "SECOND" = "second",
}

export const dateDiff = (from: Date, to: Date) => {
  const diffMs = to.getTime() - from.getTime();

  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays >= 1) {
    return diffDays === 1
      ? `${diffDays} ${DateUnit.DAY}`
      : `${diffDays} ${DateUnit.DAYS}`;
  }

  const diffHours = Math.floor((diffMs % 86400000) / 3600000);
  if (diffHours >= 1) {
    return diffHours === 1
      ? `${diffHours} ${DateUnit.HOUR}`
      : `${diffHours} ${DateUnit.HOURS}`;
  }

  const diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
  if (diffMins >= 1) {
    return diffMins === 1
      ? `${diffMins} ${DateUnit.MINUTE}`
      : `${diffMins} ${DateUnit.MINUTES}`;
  }

  const seconds = Math.floor(diffMs / 1000) < 0 ? 0 : Math.floor(diffMs / 1000);
  return seconds === 1 || seconds === 0
    ? `${seconds} ${DateUnit.SECOND}`
    : `${seconds} ${DateUnit.SECONDS}`;
};
