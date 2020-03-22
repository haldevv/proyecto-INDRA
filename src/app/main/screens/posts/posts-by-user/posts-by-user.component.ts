import {Component, OnDestroy, OnInit} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {Observable, of, Subject} from 'rxjs';
import {PostModel} from '../../../models/post.model';
import {PostService} from '../../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-posts-by-user',
  templateUrl: './posts-by-user.component.html',
  styleUrls: ['./posts-by-user.component.scss']
})
export class PostsByUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'content', 'actions'];
  dataSource: Observable<PostModel[]> = of([]);

  onDestroySubject = new Subject();

  form: FormGroup;
  userId: string;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource = this.activatedRoute.paramMap.pipe(
      mergeMap(params => {
        const id = params.get('id');
        this.userId = id;
        return id ? this.postService.loadPostsByUser(id) : of([]);
      })
    );

    this.form = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.matSnackBar.open('Post eliminado exitosamente', null, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    });
  }

  createPost() {
    const data = this.form.getRawValue();
    this.postService.createPost(data, this.userId).subscribe(() => {
      this.matSnackBar.open('Post creado exitosamente', null, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      this.form.reset();
    });
  }

}
