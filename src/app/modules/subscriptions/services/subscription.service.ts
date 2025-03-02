import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SubscriptionType } from '../models/subscription';

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
  subscribeUser(type: SubscriptionType, duration: number): Observable<any> {
    const params = new HttpParams()
      .set('type', type)
      .set('durationDays', duration.toString());
    return this.http.post(`${this.apiUrl}/subscribe`, null, { params, withCredentials: true, responseType: 'text' });
  }

  cancelSubscription(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cancel`, null, { withCredentials: true, responseType: 'text' as 'json' });
  }
}
