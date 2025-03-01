import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient) {}
  getCurrentUser(): Observable<any> {
    return this.http.get(environment.apiUrl + '/auth/user/me', { withCredentials: true });
  }

  getUserSubscription(): Observable<any> {
    console.log(this.apiUrl);

    return this.http.get<any>(`${this.apiUrl}/user/type`, { withCredentials: true });
  }
  subscribeUser(type: string, duration: number): Observable<any> {
    const params = { type, durationDays: duration.toString() };
    return this.http.post<any>(`${this.apiUrl}/subscribe`, null, { params } );
  }

  cancelSubscription(userId: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cancel`, null, { 
      params: { userId } 
    });
  }
}
