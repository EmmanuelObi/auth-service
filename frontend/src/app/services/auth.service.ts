import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  login = (url: string, body: User): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  logout = (url: string): Observable<any> => {
    return this.apiService.post(url, {}, {});
  };

  validateToken = (url: string): Observable<any> => {
    return this.apiService.get(url, {});
  };
}
