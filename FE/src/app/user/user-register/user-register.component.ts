import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerationForm!: FormGroup;
  user: User = {};
  userSubmitted: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}
  ngOnInit() {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl('', Validators.required),
    //   password: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(8),
    //   ]),
    //   cfPassword: new FormControl(''),
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   mobile: new FormControl(''),
    // });
    // this.registerationForm.setValidators(this.passwordMatchingValidator);
    this.createRegisterationForm();
  }

  passwordMatchingValidator(fg: AbstractControl): ValidationErrors | null {
    const password = fg.get('password')?.value;
    const cfPassword = fg.get('cfPassword')?.value;

    if (password === cfPassword) {
      fg.get('cfPassword')?.setErrors(null);
      return null;
    } else {
      fg.get('cfPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
  }

  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }
  get email() {
    return this.registerationForm.get('email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get cfPassword() {
    return this.registerationForm.get('cfPassword') as FormControl;
  }

  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }

  createRegisterationForm() {
    this.registerationForm = this.fb.group(
      {
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        cfPassword: [null, Validators.required],
        mobile: [null, [Validators.required, Validators.maxLength(10)]],
      },
      { Validators: this.passwordMatchingValidator }
    );
  }

  onSubmit() {
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
      // this.user = Object.assign(this.user, this.registerationForm.value);
      this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('register successfully');
    } else {
      this.alertify.error('register failed');
    }
  }
  userData(): User {
    return (this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
    });
  }
}
