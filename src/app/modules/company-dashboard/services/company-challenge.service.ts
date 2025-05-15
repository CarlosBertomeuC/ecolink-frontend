import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChallengeCompany } from '../../../core/models/ChallengeCompany';
import { Ods } from '../../../core/models/Ods';
import { Challenge } from '../../../core/models/Challenges';

@Injectable({
  providedIn: 'root'
})
export class CompanyChallengeService {

  private baseUrl: string = environment.apiUrl + '/challenge';

  constructor(private http: HttpClient) {}

  getOdsList(): Observable<Ods[]> {
    return this.http.get<Ods[]>(`${environment.apiUrl}/ods`);
  }

  getCompanyChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(`${this.baseUrl}/company`, { withCredentials: true });
  }

  getChallengeById(id: string): Observable<ChallengeCompany> {
    return this.http.get<ChallengeCompany>(`${this.baseUrl}/${id}`);
  }

  getCompanyProposal(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/proposal/challenge/${id}`,{ withCredentials: true });
  }

  createChallenge(challenge: any): Observable<ChallengeCompany> {
    console.log(challenge);
    return this.http.post<ChallengeCompany>(this.baseUrl, challenge, { withCredentials: true });
  }

  updateChallenge(id: string, challenge:any): Observable<ChallengeCompany> {
    console.log( 'update:', challenge);
   return this.http.put<ChallengeCompany>(`${this.baseUrl}/${id}`, challenge, { withCredentials: true });
  }

  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
  upgradeChallenge(id: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/upgrade/${id}`, {}, { withCredentials: true });
}
}
