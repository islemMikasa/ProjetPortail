import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Interface définissant la structure des données d'inscription
interface SignupRequest {
  username: string;
  nom: string;   
  prenom: string;    
  numtel: string; 
  email: string;
  address: string;   
  password: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userDto: SignupRequest = {
    username: '',
    nom: '',
    prenom: '',
    numtel: '',
    email: '',
    address: '',
    password: ''
  };
  confirmPassword: string = '';

  errorMessage: string = '';
  successMessage: string = '';
  passwordMismatchError: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.passwordMismatchError = '';

    if (this.userDto.password !== this.confirmPassword) {
      this.passwordMismatchError = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const signupUrl = 'http://localhost:8089/api/auth/signup';

    this.http.post<any>(signupUrl, this.userDto)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
          console.log('Signup successful:', response);
          this.router.navigate(['/pages/login']);
        },
        error: (err) => {
          console.error('Signup failed:', err);

          if (err.status === 400 && err.error && err.error.message) {
            if (err.error.message.includes("Username is already taken")) {
              this.errorMessage = "Ce nom d'utilisateur est déjà pris.";
            } else if (err.error.message.includes("Email is already in use")) {
              this.errorMessage = "Cette adresse email est déjà utilisée.";
            } else {
              this.errorMessage = err.error.message;
            }
          } else if (err.status === 409) {
            this.errorMessage = "Nom d'utilisateur ou email déjà utilisé.";
          } else {
            this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
          }
        }
      });
  }
}