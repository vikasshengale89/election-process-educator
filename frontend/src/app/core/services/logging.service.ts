import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  debug(message: string, data?: unknown): void {
    if (!environment.production) {
      this.log('debug', message, data);
    }
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(data !== undefined ? { data } : {})
    };

    if (level === 'error') {
      // In production, this would send to a remote logging service
      if (!environment.production) {
        // eslint-disable-next-line no-restricted-syntax
        globalThis.console.error(JSON.stringify(entry));
      }
    }
  }
}
