import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireModule } from '@angular/fire'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './shared/materials/materials.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDzjmvVfAck3PS8rFLzZKYTvCWB_dwfEf4",
      authDomain: "my-app-a67a6.firebaseapp.com",
      databaseURL: "https://my-app-a67a6.firebaseio.com",
      projectId: "my-app-a67a6",
      storageBucket: "my-app-a67a6.appspot.com",
      messagingSenderId: "545246406396",
      appId: "1:545246406396:web:d423aa70a13f292cc71979"
    }),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
