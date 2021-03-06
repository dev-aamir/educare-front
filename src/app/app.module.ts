import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyboardComponent } from './myboard/myboard.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { StateService } from './service/StateService';
import { AboutComponent } from './about/about.component';
import { AlertModule } from './_alert/alert.module';
import { DetailsComponent } from './details/details.component';
import { NoRightClickDirective } from './no-right-click.directive';
import { OrderComponent } from './order/order.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ShowcaseComponent } from './showcase/showcase.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION } from  'ngx-ui-loader';
import { QuizComponent } from './quiz/quiz.component';
import { QuizhomeComponent } from './quizhome/quizhome.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NotesComponent } from './notes/notes.component';
import { AskComponent } from './ask/ask.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDoubtsComponent } from './admin-doubts/admin-doubts.component';
import { QuizDashComponent } from './quiz-dash/quiz-dash.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    MyboardComponent,
    PlaylistComponent,
    AboutComponent,
    DetailsComponent,
    NoRightClickDirective,
    OrderComponent,
    ShowcaseComponent,
    QuizComponent,
    QuizhomeComponent,
    NotesComponent,
    AskComponent,
    AdminloginComponent,
    AdminDashboardComponent,
    AdminDoubtsComponent,
    QuizDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [StateService,{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
