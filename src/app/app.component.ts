import { Component } from '@angular/core';
import { TranslateService} from '@ngx-translate/core'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminace';
  constructor (private translate: TranslateService)
  {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.translate.use('es');
  }
}
