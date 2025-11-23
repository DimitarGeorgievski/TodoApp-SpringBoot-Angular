import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { NotificationsService } from '../../core/services/notification-service';


@Component({
  selector: 'app-register',
  imports: [FormsModule, MatIconModule, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(NotificationsService);
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const { registerFirstName, registerLastName, registerEmail, registerPassword } = form.value;
    console.log(form);
    this.auth
      .register(registerFirstName, registerLastName, registerEmail, registerPassword)
      .subscribe({
        next: () => {
          this.toast.showToast('successfully registered user', true);
        },
        error: () => {
          this.toast.showToast("Invalid informations, please try again", false);
        },
      });
  }
  onSignIn() {
    this.router.navigate(['/login']);
  }
}
