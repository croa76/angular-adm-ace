import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  PRODUCT_NAME = environment.nombreProd;
  PRODUCT_VER = environment.versionProd;

    // version: string = 'web v. 0.1';


  constructor(private usuarioSrv: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioSrv.logout();
    this.router.navigateByUrl('/login');
  }

}
