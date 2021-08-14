import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { FileUploadService } from '../services/file-upload.service';
class UploadedFile {
  name: string;
  url: string;
  size: string;
  timeStamp: number;
}
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();
  fileAttr: string = 'Choose File';
  progress: number;
  uploadCall: AngularFireUploadTask;
  onUploading: boolean;
  constructor(private afStorage: AngularFireStorage, private toastr: ToastrService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  uploadFileEvt(imgFile: any) {
    let timeStamp = new Date().getTime();

    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ' + (file.size / 1000) + 'kb';
        const filePath = timeStamp + '_' + file.name;
        const fileRef = this.afStorage.ref(filePath);
        this.uploadCall = this.afStorage.upload(filePath, file);

        this.uploadCall.percentageChanges().subscribe((percent: any) => {
          this.progress = percent.toFixed();
          this.onUploading = true;
        });
        this.uploadCall.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              let upFile: UploadedFile = new UploadedFile();
              upFile.name = file.name;
              upFile.size = (file.size / 1000) + 'kb';
              upFile.url = url;
              upFile.timeStamp = timeStamp
              this.fileUploadService.insert(upFile);
              this.reset();
              this.toastr.success('File uploaded successfully!');
              this.onSuccess.emit()
            })
          })
        ).subscribe();
      });
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  cancel() {
    this.toastr.error('Uploading file is cancelled!');
    this.uploadCall.cancel();
    this.reset();
  }

  reset() {
    this.onUploading = false;
    this.fileInput.nativeElement.value = "";
    this.fileAttr = 'Choose File';
  }


}
