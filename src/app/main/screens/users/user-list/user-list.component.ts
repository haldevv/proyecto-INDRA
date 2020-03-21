import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from '../../../models/user.model';
import {Observable, of, Subject} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'address', 'age', 'actions'];
  dataSource: Observable<UserModel[]> = of([]);

  onDestroySubject = new Subject();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.dataSource = this.userService.loadUsers().pipe(
      takeUntil(this.onDestroySubject.asObservable())
    );
  }

  ngOnDestroy(): void {
    this.onDestroySubject.next();
    this.onDestroySubject.complete();
  }

}
