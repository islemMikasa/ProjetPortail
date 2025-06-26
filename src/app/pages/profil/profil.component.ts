import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AssociateRibRequest {
  rib: string;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  ribRequest: AssociateRibRequest = { rib: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post<any>('http://localhost:8089/api/auth/associate-rib', this.ribRequest)
      .subscribe({
        next: (response) => {
          this.successMessage = response.message;
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Une erreur est survenue.';
        }
      });
  }
}