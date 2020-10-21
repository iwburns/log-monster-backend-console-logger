import { Level, Entry, LoggingStrategy } from 'log-monster-types';

// todo: not sure where to pull this from, maybe passed in to `getLoggingStrategy`?
const currentLoggingLevel = Level.Info;

function levelToString(level: Level) {
  switch (level) {
    case Level.Trace:
      return 'trace';
    case Level.Debug:
      return 'debug';
    case Level.Info:
      return 'info';
    case Level.Warn:
      return 'warn';
    case Level.Error:
      return 'error';
    case Level.Fatal:
      return 'fatal';
    default:
      return 'invalid-log-level';
  }
}

function log(entry: Entry): boolean {
  if (entry.level < currentLoggingLevel) {
    return false;
  }

  const logText = `[${entry.group}] | [${levelToString(entry.level)}] @ [${entry.occurred}] :: [${entry.text}]`;
  let logger = console.log;

  switch (entry.level) {
    case Level.Trace:
    case Level.Debug:
    case Level.Info:
      logger = console.info;
      break;
    case Level.Warn:
      logger = console.warn;
      break;
    case Level.Error:
    case Level.Fatal:
      logger = console.error;
      break;
    default:
      logger = console.log;
  }

  logger(logText);
  return true;
}

function findLogs(): Array<Entry> {
  return [];
}

export function getLoggingStrategy(): LoggingStrategy {
  return {
    log,
    findLogs,
  };
}
