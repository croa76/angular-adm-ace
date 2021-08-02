import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [


   {path: '**', component: NopagefoundComponent }


];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
