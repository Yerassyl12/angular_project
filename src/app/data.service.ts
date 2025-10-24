import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://api.currencyapi.com/v3/latest'; 
  private apiKey = 'cur_live_9wtjEEM0rYnbqqVaSUyREdH9a7GKNkbrHTgTUa49';
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const url = `${this.apiUrl}?apikey=${this.apiKey}&base_currency=USD`;
    return this.http.get(url);
  }
}
