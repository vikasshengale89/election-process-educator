import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // In a real app, send to logging service
      // AGENTS.md rule: NEVER use console.log - use a logging service
      // For this hackathon, we'll just format the error safely
      const errorMessage = error.error instanceof ErrorEvent 
        ? error.error.message 
        : `Server returned code: ${error.status}, error message is: ${error.message}`;
      
      return throwError(() => new Error(errorMessage));
    })
  );
};
