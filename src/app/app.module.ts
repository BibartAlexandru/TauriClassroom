// src/app/app.module.ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  HttpClientModule,
  HttpClient,
  HttpXhrBackend,
} from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppComponent,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HttpClient,
    },
  ],
  bootstrap: [],
})
export class AppModule {}
