import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {PostModel} from '../models/post.model';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  collectionName = 'Posts';

  constructor(private firestore: AngularFirestore) {
  }

  loadPostsByUser(userId: string): Observable<PostModel[]> {
    return this.firestore.collection<any>(this.collectionName).valueChanges({idField: 'id'}).pipe(
      map(posts => {
        console.log({posts});
        const postsList = posts.filter((postToCheck) => postToCheck.publishedBy === userId);
        return postsList;
      })
    );
  }

  createPost(data: PostModel, userId: string) {
    data.publishedBy = userId;
    return from(this.firestore.collection<PostModel>(this.collectionName).add(data));
  }

  deletePost(postId: string) {
    return from(this.firestore.collection<UserModel>(this.collectionName).doc(postId).delete());
  }
}
