import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map,tap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  private searchSubject = new Subject<string>();
  currencies$!: Observable<[string, number][]>;
  lastUpdated?: string;
  searchTerm: string = '';
  kzt = 540;


  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.currencies$ = this.searchSubject.pipe(
      startWith(''), 
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term =>
        this.dataService.getData().pipe(
          tap((data: any) => {
            if (data?.meta?.last_updated_at) {
              this.lastUpdated = data.meta.last_updated_at;
            }
          }),
          map((data: any) => {
            const rates = data.data;
            const entries: [string, number][] = Object.entries(rates).map(
              ([code, value]: [string, any]) => [code, Number(value.value)]
            );
            return entries.filter(([code]) =>
              code.toLowerCase().includes(term.toLowerCase())
            );
          })
        )
      )
    );
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }
}
