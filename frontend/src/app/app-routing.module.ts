import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { ManageAllQuestionsComponent } from './admin/manage-questions/manage-all-questions/manage-all-questions.component';
import { ManageOwnQuestionsComponent } from './admin/manage-questions/manage-own-questions/manage-own-questions.component';
import { ManageScoreComponent } from './admin/manage-score/manage-score.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { MenuComponent } from './admin/menu/menu.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { RegisterComponent } from './admin/register/register.component';
import { GameComponent } from './guest/game/game.component';
import { ScoreboardComponent } from './guest/scoreboard/scoreboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/profile', component: ProfileComponent },
  { path: 'auth/menu', component: MenuComponent },

  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'manage-score', component: ManageScoreComponent },
  { path: 'questions/own', component: ManageOwnQuestionsComponent },
  { path: 'questions/all', component: ManageAllQuestionsComponent },

  { path: 'game', component: GameComponent },
  { path: 'scoreboard', component: ScoreboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
