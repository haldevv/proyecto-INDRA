import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from '../screens/users/user-list/user-list.component';
import {UserFormComponent} from '../screens/users/user-form/user-form.component';


const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/form', component: UserFormComponent},
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: '**', redirectTo: 'users'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
