import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserModel} from '../models/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private collectionName = 'Users';

  constructor(private firestore: AngularFirestore) {
  }

  loadUsers(): Observable<any> {
    return this.firestore.collection<UserModel>(this.collectionName).valueChanges({idField: 'id'});
  }

  createUser(data: UserModel): Observable<any> {
    return from(this.firestore.collection<UserModel>(this.collectionName).add(data));
  }

  loadUserById(userId: string): Observable<UserModel> {
    return this.firestore.collection<any>(this.collectionName).snapshotChanges().pipe(
      map(users => {
        const user = users.filter((userToCheck) => userToCheck.payload.doc.id === userId);
        return (user.length > 0) ? user[0].payload.doc.data() : null;
      })
    );
  }

  updateUser(userId: string, data: UserModel): Observable<any> {
    return from(this.firestore.collection<UserModel>(this.collectionName).doc(userId).update(data));
  }

  deleteUser(userId: string) {
    return from(this.firestore.collection<UserModel>(this.collectionName).doc(userId).delete());
  }
}
