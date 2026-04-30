type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  readonly level: LogLevel;
  readonly message: string;
  readonly timestamp: string;
  readonly data?: unknown;
}

class Logger {
  private formatEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data
    };
  }

  info(message: string, data?: unknown): void {
    const entry = this.formatEntry('info', message, data);
    process.stdout.write(JSON.stringify(entry) + '\n');
  }

  warn(message: string, data?: unknown): void {
    const entry = this.formatEntry('warn', message, data);
    process.stdout.write(JSON.stringify(entry) + '\n');
  }

  error(message: string, data?: unknown): void {
    const entry = this.formatEntry('error', message, data);
    process.stderr.write(JSON.stringify(entry) + '\n');
  }

  debug(message: string, data?: unknown): void {
    if (process.env['NODE_ENV'] !== 'production') {
      const entry = this.formatEntry('debug', message, data);
      process.stdout.write(JSON.stringify(entry) + '\n');
    }
  }
}

export const logger = new Logger();
