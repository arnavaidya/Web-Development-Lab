import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <h2 class="profile-title">Your Profile</h2>
        
        <div class="profile-info">
          <div class="info-item">
            <span class="info-label">Email:</span>
            <span class="info-value">{{auth.getCurrentUser()?.email}}</span>
          </div>
        </div>
        
        <button class="logout-button" (click)="logout()">
          Logout
        </button>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    
    .profile-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      width: 100%;
      max-width: 500px;
    }
    
    .profile-title {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }
    
    .profile-info {
      margin-bottom: 2rem;
    }
    
    .info-item {
      padding: 1rem;
      border: 1px solid #eee;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    
    .info-label {
      font-weight: bold;
      color: #555;
    }
    
    .info-value {
      color: #333;
    }
    
    .logout-button {
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.75rem;
      font-size: 1rem;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.2s;
    }
    
    .logout-button:hover {
      background-color: #e53935;
    }
  `]
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router) {}
  
  ngOnInit() {
    // Verify user is logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}