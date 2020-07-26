import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
const ip = environment.backend;
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  currentProject:any

  constructor(private http: HttpClient) { }

  addProject(project): Observable<any> {
    return this.http.post(`${ip}/addProject`, project)
  }
  
  getProjects(): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/getProjects`, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  }

  getProject(id): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));;
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(`${ip}/project/${id}`, { headers: headers }).toPromise().then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    })
  }

  addQuestion(info): Observable<any> {
    return this.http.post(`${ip}/discussion/addQuestion`, info)
  }

  storeProject(project){this.currentProject = project}
  getStoredProject(){return this.currentProject}
}
