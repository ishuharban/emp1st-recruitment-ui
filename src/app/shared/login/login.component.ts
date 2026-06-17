import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  loginForm: FormGroup;

  private readonly VALID_USERNAME = 'admin';
  private readonly VALID_PASSWORD = '12345';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],   
      password: ['', Validators.required]    
    });
  }

  ngOnInit() {
    // Already logged in hai toh dashboard pe bhejo
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.errorMessage = ''; // Error reset

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Validation errors dikhao
      return;
    }

    const { username, password } = this.loginForm.value;

    // Credentials check
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      this.isLoading = true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', 'abc123token'); // SSO  Token store in local

      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
        this.cdr.detectChanges();
      }, 1500);

    } else {
      // Wrong credentials 
      this.errorMessage = 'Invalid username or password!';
      this.loginForm.get('password')?.reset(); // Password field clear
      this.cdr.detectChanges();
    }
  }

  // Template ke liye helper getters
  get usernameControl() { return this.loginForm.get('username'); }
  get passwordControl() { return this.loginForm.get('password'); }
}