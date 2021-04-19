import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const USER_API = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(USER_API + userId);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API + 'current');
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(USER_API + 'update', user);
  }
}
