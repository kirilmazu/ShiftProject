import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainRoutComponent } from './components/main-rout/main-rout.component';
import { HeaderComponent } from './components/header/header.component';
import { MenageMenuComponent } from './components/menage-menu/menage-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestsComponent } from './components/requests/requests.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { BuildScheduleComponent } from './components/build-schedule/build-schedule.component';
import { HttpClientModule } from '@angular/common/http';

import {MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
