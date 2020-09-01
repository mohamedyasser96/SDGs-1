import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
const ip = environment.backend;

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getSentRequests(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/request`, { headers: headers }).toPromise()
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
    return promise;
  }

  getRecievedRequests(id): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/request/${id}`, { headers: headers }).toPromise()
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
    return promise;
  }

  modifyStatus(id, status): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.put(`${ip}/request`, { id: id, status: status }, { headers: headers }).toPromise()
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
    return promise;
  }
}
