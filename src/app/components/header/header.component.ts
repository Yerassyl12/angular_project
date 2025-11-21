import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';  

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser$: Observable<User | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.currentUser$ = this.auth.currentUser$;
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
