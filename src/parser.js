export const stats = {
    INFO: 0,
    WARN: 0,
    ERROR: 0,
    INVALID: 0,
    TOTAL: 0,
};
const logRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)\s+(INFO|WARN|ERROR)\s+(.+)$/;

export const parser = (line) => {
    if (!line) return;
    stats.TOTAL++;

    const match = line.match(logRegex);
    if (!match) {
        stats.INVALID++;
        return null;
    }

    const [, timestamp, level, message] = match;

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
        stats.INVALID++;
        return null;
    }

    const expectedTimestamp = timestamp.includes(".")
        ? timestamp
        : timestamp.replace("Z", ".000Z");

    if (
        date.toISOString() !== expectedTimestamp ||
        !message.trim()
    ) {
        stats.INVALID++;
        return null;
    }

    stats[level]++;

    const validLog = {
        timestamp,
        level,
        message
    }

    return validLog;
}