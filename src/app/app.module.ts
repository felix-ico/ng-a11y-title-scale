import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { I18nService } from './services/i18n.service'
import { I18nPipe } from './shared/i18n/i18n.pipe'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
        AppComponent,
        I18nPipe
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule
  ],
  providers: [I18nService],
  bootstrap: [AppComponent]
})
export class AppModule { }
