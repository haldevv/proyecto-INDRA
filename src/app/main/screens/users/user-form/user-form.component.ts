import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserModel} from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  isUpdatingUser: boolean;

  idToUpdate: string;

  constructor(private fb: FormBuilder, private userService: UserService, private matSnackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isUpdatingUser = false;
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      age: new FormControl('', [])
    });

    this.activatedRoute.paramMap.pipe(
      mergeMap(params => {
        const id = params.get('id');
        this.idToUpdate = id;
        return id ? this.userService.loadUserById(id) : of(null);
      })
    ).subscribe((userToUpdate: UserModel) => {
      if (userToUpdate) {
        this.form.patchValue(userToUpdate);
        this.isUpdatingUser = true;
      }
    });

  }

  createOrUpdateUser = () => (this.isUpdatingUser) ? this.updateUser() : this.createUser();

  updateUser() {
    const data = this.form.getRawValue();
    this.userService.updateUser(this.idToUpdate, data).subscribe(() => {
      this.matSnackBar.open('Usuario actualizado exitosamente', null, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      this.form.reset();
    });
  }

  createUser() {
    const data = this.form.getRawValue();
    this.userService.createUser(data).subscribe(() => {
      this.matSnackBar.open('Usuario creado exitosamente', null, {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      this.form.reset();
    });
  }

}
