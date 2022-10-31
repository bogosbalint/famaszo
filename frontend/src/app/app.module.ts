import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageOwnQuestionsComponent } from './admin/manage-questions/manage-own-questions/manage-own-questions.component';
import { ManageAllQuestionsComponent } from './admin/manage-questions/manage-all-questions/manage-all-questions.component';
import { ManageScoreComponent } from './admin/manage-score/manage-score.component';
import { ScoreboardComponent } from './guest/scoreboard/scoreboard.component';
import { GameComponent } from './guest/game/game.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MenuComponent,
    ManageUsersComponent,
    ManageOwnQuestionsComponent,
    ManageAllQuestionsComponent,
    ManageScoreComponent,
    ScoreboardComponent,
    GameComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
