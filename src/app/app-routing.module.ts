import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyboardComponent } from './myboard/myboard.component';
import { OrderComponent } from './order/order.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'myboard', component: MyboardComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'about', component: AboutComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'showcase', component: ShowcaseComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
