import { throwError } from 'rxjs';

export function handleError(error) {
  let errorMessage = '';
  console.log(error);
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // server-side error
    errorMessage = `Error: ${error.message}`;
  }

  window.alert(errorMessage);
  return throwError(errorMessage);
};