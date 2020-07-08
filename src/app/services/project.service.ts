import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
const ip = environment.backend;
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  addProject(project): Observable<any> {
    return this.http.post(`${ip}/addProject`, project)
  }
  getProjects(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/getProjects`, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  }
}
