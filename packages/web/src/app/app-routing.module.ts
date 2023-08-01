import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseTrackerComponent } from './components/expense-tracker/expense-tracker.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '',   redirectTo: '/expense', pathMatch: 'full' },
  { path: 'expense', component: ExpenseTrackerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
