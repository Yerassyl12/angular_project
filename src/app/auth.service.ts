import { Injectable } from '@angular/core';
import { Auth, 
         authState, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut 
       } from '@angular/fire/auth';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$;

  constructor(private auth: Auth) {
    // observable — текущий пользователь (null если не залогинен)
    this.currentUser$ = authState(this.auth);
  }

  // Регистрация
  signup(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(err => {
        return throwError(() => this.handleError(err));
      })
    );
  }

  // Логин
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(err => {
        return throwError(() => this.handleError(err));
      })
    );
  }

  // Выход
  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError(err => throwError(() => 'Logout failed'))
    );
  }

  // Обработка ошибок
  private handleError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Email is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email format.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      case 'auth/user-not-found':
        return 'User not found.';
      case 'auth/wrong-password':
        return 'Wrong password.';
      default:
        return 'Authentication error occurred.';
    }
  }
}
