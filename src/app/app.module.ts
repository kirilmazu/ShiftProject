import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainRoutComponent } from './main-rout/main-rout.component';
import { HeaderComponent } from './header/header.component';
import { MenageMenuComponent } from './menage-menu/menage-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsComponent } from './requests/requests.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleComponent } from './schedule/schedule.component';
import { BuildScheduleComponent } from './build-schedule/build-schedule.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainRoutComponent,
    HeaderComponent,
    MenageMenuComponent,
    DashboardComponent,
    RequestsComponent,
    ScheduleComponent,
    BuildScheduleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
