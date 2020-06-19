import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
const ip = environment.backend;
@Injectable({
  providedIn: 'root'
})
export class PsService {

  constructor(private http: HttpClient) { }

  register(userInfo): Observable<any> {
    return this.http.post(`${ip}/privateSector/register`, userInfo)
  }
}
