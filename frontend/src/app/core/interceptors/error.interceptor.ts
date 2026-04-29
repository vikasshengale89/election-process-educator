import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggingService } from '../services/logging.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggingService = inject(LoggingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = error.error instanceof ErrorEvent
        ? error.error.message
        : `HTTP ${error.status}: ${error.message}`;

      loggingService.error('HTTP Error', { url: req.url, status: error.status, message: errorMessage });

      return throwError(() => new Error(errorMessage));
    })
  );
};
