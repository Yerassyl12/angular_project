import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../data.service';
import { Observable, Subject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  private searchSubject = new Subject<string>();
  products$!: Observable<any[]>;
  searchTerm: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.products$ = this.searchSubject.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.dataService.getData().pipe(
          map((products: any[]) =>
            products.filter(p =>
              p.title.toLowerCase().includes(term.toLowerCase())
            )
          )
        )
      )
    );
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }
}
