import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  readonly level: LogLevel;
  readonly message: string;
  readonly timestamp: string;
  readonly data?: unknown;
}

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private readonly platformId = inject(PLATFORM_ID);

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
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(data !== undefined ? { data } : {})
    };

    if (!isPlatformBrowser(this.platformId)) return;

    if (level === 'error' && !environment.production) {
      this.writeToConsole(entry);
    }
  }

  private writeToConsole(entry: LogEntry): void {
    const formatted = JSON.stringify(entry);
    const stderr = globalThis.console;
    stderr.error(formatted);
  }
}
