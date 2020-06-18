import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
const ip = environment.backend;
@Injectable({
  providedIn: 'root'
})
export class SDGsService {

  constructor(private http: HttpClient) { }
  getSDGs(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/intendedSDGs`, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  }
}
