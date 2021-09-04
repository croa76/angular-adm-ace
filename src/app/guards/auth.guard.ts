import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioSrv: UsuarioService,
               private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log(111);

      return this.usuarioSrv.validarToken ()
      .pipe(
        tap( estaAutenticado => {
          console.log(2222);

          if ( !estaAutenticado ) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
