import { ApplicationError } from '@/protocols';

export function forbiddenBookingError(): ApplicationError {
  return {
    name: 'forbiddenBookingError',
    message:
      'maybe your ticket is remote, does not have accommodation included or accommodation has not yet been paid for',
  };
}
