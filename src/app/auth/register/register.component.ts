import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;
  public formRegister: FormGroup ;


  constructor(private fb: FormBuilder,
              private usuarioSrv:UsuarioService,
              private router: Router) {
    this.formRegister = this.fb.group({
      nombre: new FormControl('',[ Validators.required, Validators.minLength(3)]),
      email: new FormControl('',[ Validators.required, Validators.email]),
      password: new FormControl('',[ Validators.required]),
      password2: new FormControl('',[Validators.required]),
      terminos: new FormControl(false,[ Validators.required])

    }, {
      validators: this.passwordsIguales('password','password2')
    });
  }

  ngOnInit(): void {

  }

  crearUsuario() {
    this.formSubmitted = true;
    // console.log(this.form.value);
    // console.log(this.form);
    if (!this.formRegister.valid) return;

    this.usuarioSrv.crearUsuario(this.formRegister.value)
    .subscribe( resp => {
      this.router.navigateByUrl('/');
    }, (err: any) => {
      // Si sucede error
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  campoValido( campo: string): boolean {

    // Si no he ha dado submit, es un campo válido
    if (!this.formSubmitted) return true;

    let objeto: any = this.formRegister.get(campo);

    if (typeof objeto == 'undefined') return false;

    if (objeto.invalid) return false;


    if (campo == 'terminos') {

      return objeto.value;
    } else {

      return true;
    }
  }

  contraseniasValidas() {
    const pass1 = this.formRegister.get('password')?.value;
    const pass2 = this.formRegister.get('password2')?.value;
    // Si no he ha dado submit, es un campo válido
    if (!this.formSubmitted) return true;
    if (pass1 == '') return false;
    if (pass1 != pass2) return false;
    return true;
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {

      const pass1 = formGroup.get(pass1Name)?.value;
      const pass2 = formGroup.get(pass2Name)?.value;
      // console.log('xxxxxx', formGroup, pass1, pass2);
      if (pass1 === pass2){
        formGroup.get(pass2Name)?.setErrors(null);
      } else {
        formGroup.get(pass2Name)?.setErrors({ noEsIgual: true });
      }

    }
  }
}
