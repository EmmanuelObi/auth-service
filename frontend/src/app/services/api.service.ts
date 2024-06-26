import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, User } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: any): Observable<T> {
    return this.httpClient.get<T>(`${environment.apiUrl}${url}`, {
      ...options,
      withCredentials: true,
    }) as Observable<T>;
  }

  post<T>(url: string, body: User, options: any): Observable<T> {
    return this.httpClient.post<T>(`${environment.apiUrl}${url}`, body, {
      ...options,
      withCredentials: true,
    }) as Observable<T>;
  }

  put<T>(url: string, body: User, options: any): Observable<T> {
    return this.httpClient.put<T>(`${environment.apiUrl}${url}`, body, {
      ...options,
      withCredentials: true,
    }) as Observable<T>;
  }

  patch<T>(url: string, body: User, options: any): Observable<T> {
    return this.httpClient.patch<T>(`${environment.apiUrl}${url}`, body, {
      ...options,
      withCredentials: true,
    }) as Observable<T>;
  }

  delete<T>(url: string, options: any): Observable<T> {
    return this.httpClient.delete<T>(`${environment.apiUrl}${url}`, {
      ...options,
      withCredentials: true,
    }) as Observable<T>;
  }
}
