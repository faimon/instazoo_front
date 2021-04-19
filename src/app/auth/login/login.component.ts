import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../service/token-storage.service';
import {AuthService} from '../../service/auth.service';
import {NotificationService} from '../../service/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.compose([Validators.required])],
    password: ['', Validators.compose([Validators.required])],
  });

  constructor(private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {
    if (this.tokenStorage.getUser() !== null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data);
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.notificationService.showSnackBar('Succesfully logged in');
      this.router.navigate(['/main']);
      window.location.reload();
    }, error => {
      console.log('error: ' + error);
      this.notificationService.showSnackBar(error.message);
    });
  }
}
