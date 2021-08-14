import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './services/file-upload.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  uploadedFiles: any[] = [];
  loading: boolean;
  constructor(private fileUploadService: FileUploadService, private afStorage: AngularFireStorage) { }

  ngOnInit() {
    this.fileUploadService.getFileList();
    this.getUploadedFiles();
  }

  getUploadedFiles() {
    this.uploadedFiles = [];
    this.loading = true;
    this.fileUploadService.read().subscribe((res: any) => {
      if (res) {
        Object.entries(res).map(([key, value]) => {
          let obj: any = value;
          obj.id = key;
          this.uploadedFiles.push(obj)
        });
      }
      this.loading = false;
    })
  }

  removeFile(file: any) {
    // only if you really want to delete the files from the storage
    // const storageRef = this.afStorage.storage.ref();
    // storageRef.child(`${file.timeStamp + '_' + file.name}`).delete();
    this.fileUploadService.delete(file.id).subscribe((res) => {
      this.getUploadedFiles();
    })
  }


}
