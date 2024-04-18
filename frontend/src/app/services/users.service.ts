import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService) {}

  getUsers = (url: string): Observable<User[]> => {
    return this.apiService.get(url, {});
  };

  createUser = (url: string, body: User): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  deleteUser = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
  updateUser = (url: string, body: User): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  resetPassword = (url: string, body: User): Observable<any> => {
    return this.apiService.patch(url, body, {});
  };

  forgotPassword = (url: string, body: User): Observable<any> => {
    return this.apiService.post(url, body, {});
  };
}
