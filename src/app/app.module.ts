import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AppRoutingModule } from './app-routing.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

// export function createTranslateLoader ( http: HttpClient) {
//   return new TranslateHttpLoader(http,'./assets/i18n/', '.json')
// }

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    HttpClientModule,
    TranslateModule.forRoot ({
      loader: {
        provide: TranslateLoader,
        useFactory: ( http: HttpClient) => {
          return new TranslateHttpLoader(http,'./assets/i18n/', '.json')
        },
        deps: [HttpClient]

      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
