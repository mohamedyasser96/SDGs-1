import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
const ip = environment.backend;
@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) { }

  addAdmin(admin): Observable<any> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(`${ip}/admin/addAdmin`, admin, { headers: headers })
  }

  getAdmins(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/admin/getAdmins`, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  }

  getSignupRequests(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/admin/signupRequests`, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  }

  approveRequest(id, type): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.put(`${ip}/admin/signupRequest/${id}/${type}`, {}, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  }
}

