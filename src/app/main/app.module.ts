import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './router/app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserListComponent} from './screens/users/user-list/user-list.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import { UserFormComponent } from './screens/users/user-form/user-form.component';
import {MatButtonModule, MatIconModule, MatTableModule, MatToolbarModule, MatTooltipModule} from '@angular/material';

const matModules = [
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule
];


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    matModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
