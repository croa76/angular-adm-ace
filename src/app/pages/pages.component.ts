import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
const PRODUCT_NAME = environment.nombreProd;
const PRODUCT_VER = environment.versionProd;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
