import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  fileList: AngularFireList<any>;
  api = 'https://my-app-a67a6.firebaseio.com'
  constructor(private firebase: AngularFireDatabase, private http: HttpClient) { }

  getFileList() {
    this.fileList = this.firebase.list('uploadedFiles');
  }

  insert(file: any) {
    this.fileList.push(file);
  }

  read() {
    return this.http.get(this.api + '/uploadedFiles.json');
  }

  delete(id:any) {
    return this.http.delete(this.api + `/uploadedFiles/${id}.json`);
  }
}
