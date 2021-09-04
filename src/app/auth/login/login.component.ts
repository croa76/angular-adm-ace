import { Component, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public auth2: any;
  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioSrv: UsuarioService,
              private ngzone: NgZone) {
    let email: string = localStorage.getItem('email-se') || '';

    this.formLogin = this.fb.group(
      {
        email: new FormControl( email, [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        remember: new FormControl(email.length > 0)
      });
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    if (!this.formLogin.valid) return;

    this.usuarioSrv.login(this.formLogin.value)
    .subscribe( resp => {
      if (this.formLogin.get('remember')?.value) {
        localStorage.setItem('email-se', this.formLogin.get('email')?.value);
      } else {
        localStorage.removeItem('email-se');
      }
      this.router.navigateByUrl('/');
    }, (err: any) => {
      // Si sucede error
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
  onSuccess( googleUser:any ) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }

  onFailure(error: any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  startApp ()  {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '283397737694-6jt9sg92r82dguohq6s8gvoh4oli2a5j.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token =  googleUser.getAuthResponse().id_token;
          this.usuarioSrv.loginGoogle(id_token)
          .subscribe( () => {
            this.ngzone.run(() =>  this.router.navigateByUrl('/'));
          } );
        }, function(error: any) {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
