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
  getPS(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/privateSector`, { headers: headers }).toPromise()
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
    return promise;
  }
}
