import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Create Account</h2>
        
        <div class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="form-input"
              placeholder="Enter your email"
              #email>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-input"
              placeholder="Create a password"
              #password>
          </div>
          
          <button class="auth-button" (click)="register(email.value, password.value)">
            Register
          </button>
          
          <div *ngIf="error" class="error-message">{{error}}</div>
          
          <div class="auth-footer">
            <span>Already have an account?</span>
            <a routerLink="/login" class="auth-link">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    
    .auth-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      width: 100%;
      max-width: 400px;
    }
    
    .auth-title {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
    
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .form-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .auth-button {
      background-color: #4a6cf7;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.75rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .auth-button:hover {
      background-color: #3a5be8;
    }
    
    .error-message {
      color: #e53935;
      text-align: center;
    }
    
    .auth-footer {
      text-align: center;
      margin-top: 1rem;
    }
    
    .auth-link {
      color: #4a6cf7;
      text-decoration: none;
      margin-left: 0.5rem;
    }
    
    .auth-link:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  error = '';
  
  constructor(private auth: AuthService, private router: Router) {}
  
  register(email: string, password: string) {
    if (email && password) {
      if (this.auth.register(email, password)) {
        this.router.navigate(['/profile']);
      } else {
        this.error = 'Email already in use';
      }
    } else {
      this.error = 'Please fill all fields';
    }
  }
}