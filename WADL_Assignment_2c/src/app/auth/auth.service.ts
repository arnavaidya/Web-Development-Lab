import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;
  private isAuthenticated = false;

  constructor() {
    // Load users from localStorage if available
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
  }

  register(email: string, password: string): boolean {
    // Check if user already exists
    const userExists = this.users.some(user => user.email === email);
    if (userExists) {
      return false;
    }

    // Create new user
    const newUser: User = { email, password };
    this.users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(this.users));
    
    // Login the user after registration
    this.currentUser = newUser;
    this.isAuthenticated = true;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      this.currentUser = user;
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  }

  logout(): void {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}