import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {tap} from 'rxjs/operators';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<any>;

  constructor(private firestore: AngularFirestore) {
  }

  loadUsers(): Observable<any> {
    return this.firestore.collection<UserModel>('Users').valueChanges();
  }

  createUser() {
    this.userList.push({});
  }
}
