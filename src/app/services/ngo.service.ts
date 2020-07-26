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

  generateFileLink(fileData, ext, fileName) {
    var blobData = this.convertBase64ToBlobData(fileData, ext)
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
      window.navigator.msSaveOrOpenBlob(blobData, fileName);
    } else { // chrome
      const blob = new Blob([blobData], { type: ext });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      var pdfLink = url;
      link.download = fileName;
      return pdfLink;
    }
  }

  convertBase64ToBlobData(base64Data: string, contentType: string = 'application/pdf', sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
