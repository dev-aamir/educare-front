import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDoubtsComponent } from './admin-doubts/admin-doubts.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AppComponent } from './app.component';
import { AskComponent } from './ask/ask.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyboardComponent } from './myboard/myboard.component';
import { NotesComponent } from './notes/notes.component';
import { OrderComponent } from './order/order.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizDashComponent } from './quiz-dash/quiz-dash.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizhomeComponent } from './quizhome/quizhome.component';
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
  { path: 'showcase', component: ShowcaseComponent},
  { path: 'practiceDash', component: QuizDashComponent},
  { path: 'practice', component: QuizComponent},
  { path: 'practicehome', component: QuizhomeComponent},
  { path: 'note', component: NotesComponent},
  { path: 'askdoubt', component: AskComponent},
  { path: 'masterLogin', component: AdminloginComponent},
  { path: 'masterDashboard', component: AdminDashboardComponent},
  { path: 'resolveDoubts', component: AdminDoubtsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
