import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export interface SearchParams {
  date: string;
  year: number;
  coords: string;
  tz: number;
  dst: boolean;
}

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
})
export class SearchForm {
  @Output() searchSubmit = new EventEmitter<SearchParams>();

  searchForm: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      date: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.min(1700), Validators.max(2100)]],
      coords: ['51.50,-0.12', [Validators.pattern(/^[-+]?\d+(\.\d+)?,\s*[-+]?\d+(\.\d+)?$/)]],
      tz: [0, [Validators.min(-12), Validators.max(14)]],
      dst: [false],
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const value = this.searchForm.getRawValue();

    this.searchSubmit.emit({
      date: String(value.date ?? ''),
      year: Number(value.year ?? new Date().getFullYear()),
      coords: String(value.coords ?? ''),
      tz: Number(value.tz ?? 0),
      dst: Boolean(value.dst),
    });
  }
}