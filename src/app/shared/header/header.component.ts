import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
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


  constructor() { }

  ngOnInit(): void {
  }

}
