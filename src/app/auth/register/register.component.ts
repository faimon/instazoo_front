import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.compose([Validators.email])],
    firstname: ['', Validators.compose([Validators.required])],
    lastname: ['', Validators.compose([Validators.required])],
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])],
    confirmPassword: ['', Validators.compose([Validators.required])],
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  submitReg(): void {
    this.authService.register({
      email: this.regForm.value.email,
      firstname: this.regForm.value.firstname,
      lastname: this.regForm.value.lastname,
      username: this.regForm.value.username,
      password: this.regForm.value.password,
      confirmPassword: this.regForm.value.confirmPassword
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Successful Register');
      this.router.navigate(['/']);
      window.location.reload();
    }, (err => {
      console.log('error : ' + err);
      this.notificationService.showSnackBar(err.message);
    }));
  }
}
