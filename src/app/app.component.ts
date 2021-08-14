import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './services/file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  uploadedFiles: any[] = [];
  loading: boolean;
  constructor(private fileUploadService: FileUploadService) { }

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

  removeFile(id: any) {
    this.fileUploadService.delete(id).subscribe((res) => {
      this.getUploadedFiles();
    })
  }


}
