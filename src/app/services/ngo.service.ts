import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
const ip = environment.backend;
@Injectable({
  providedIn: 'root'
})
export class NgoService {

  constructor(private http: HttpClient) { }

  register(userInfo): Observable<any> {
    return this.http.post(`${ip}/ngo/register`, userInfo)
  }

  getNGOs(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/ngo`, { headers: headers }).toPromise()
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
    return promise;
  }
}
