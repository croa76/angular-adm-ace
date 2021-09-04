import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginComponent } from '../auth/login/login.component';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_ur
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
              private router: Router,
              private ngzone: NgZone) {
    this.googleInit();
   }
  public auth2: any;

  logout() {
    localStorage.removeItem('token-se');
    this.auth2.signOut().then ( () => {
      console.log('User signed out.');
      this.ngzone.run (() => {
        this.router.navigateByUrl('/login');
      });
    })
  }
  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token-se') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
    .pipe(
      tap ((resp: any) => {
        console.log('set-1');

        localStorage.setItem('token-se', resp.token);
      }),
      map (resp =>  true),
      catchError( error =>  of(false))
    );
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post(`${base_url}/usuarios`,formData)
    .pipe(
      tap ( (resp: any) => {
          console.log('set-2');

          localStorage.setItem('token-se',resp.token);
      })
    );

  }

  login( formData: LoginComponent) {

    return this.http.post(`${base_url}/login`,formData)
      .pipe(
        tap ( (resp: any) => {
             console.log('set-3');

            localStorage.setItem('token-se',resp.token);
        })
      );

  }

  googleInit() {

    return new Promise( resolve => {
      console.log('se ejecuta googleInit');

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '283397737694-6jt9sg92r82dguohq6s8gvoh4oli2a5j.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });

        resolve(true);

      });
    })
  }
  loginGoogle( token: any) {
    console.log('el-token---', token);

    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap ( (resp: any) => {
             console.log('set-3');

            localStorage.setItem('token-se',resp.token);
        })
      );

  }

}
