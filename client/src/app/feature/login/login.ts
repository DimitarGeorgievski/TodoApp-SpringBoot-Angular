import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { NotificationsService } from '../../core/services/notification-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatIconModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(NotificationsService);
  ngOnInit() {
    if (this.auth.userData) {
      this.router.navigate(['/todos']);
    }
  }
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { loginEmail, loginPassword } = form.value;
    console.log(form);
    this.auth.login(loginEmail, loginPassword).subscribe({
      next: () => {
        this.toast.showToast('successfully login', true);
      },
      error: (err: Error) => {
        this.toast.showToast("Invalid Credentials", false);
      },
    });
  }
  onSignup(){
    this.router.navigate(["/register"])
  }
}
