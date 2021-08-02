import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot ({
      loader: {
        provide: TranslateLoader,
        useFactory: ( http: HttpClient) => {
          return new TranslateHttpLoader(http,'../../assets/i18n/', '.json')
        },
        deps: [HttpClient]

      }
    })
  ]
})
export class AuthModule { }
