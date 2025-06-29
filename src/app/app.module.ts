import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './pages/account/account.component';
import { ClientService } from './service/client.service';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { UserAdminComponent } from './pages/user-admin/user-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { PrioriterUserComponent } from './pages/prioriter-user/prioriter-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-admin', component: UserAdminComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: AccountComponent },
  { path: 'prioriter-user', component: PrioriterUserComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }