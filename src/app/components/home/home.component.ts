import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topCurrencies = ['EUR', 'GBP', 'JPY', 'CHF']; 
  rates: { code: string; value: number }[] = [];
  loading = true;
  lastUpdated?: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data: any) => {
        this.lastUpdated = data?.meta?.last_updated_at;
        const allRates = data.data;
        this.rates = this.topCurrencies.map(code => ({
          code,
          value: allRates[code]?.value
        }));
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching rates:', err);
        this.loading = false;
      }
    });
  }
}
