import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'response';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface User {
  _id?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string[];
  isAdmin?: boolean;
  logCount?: number;
  createdAt?: string;
}
