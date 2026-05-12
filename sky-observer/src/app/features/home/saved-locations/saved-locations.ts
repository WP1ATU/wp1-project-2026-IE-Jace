import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '../../../shared/models/location.model';

export interface CreateLocationPayload {
  label: string;
  lat: number;
  lon: number;
  tz: number;
  dstDefault: boolean;
}

@Component({
  selector: 'app-saved-locations',
  imports: [ReactiveFormsModule],
  templateUrl: './saved-locations.html',
  styleUrl: './saved-locations.scss',
})
export class SavedLocations {
  @Input() locations: Location[] = [];
  @Input() loading = false;
  @Input() saving = false;
  @Input() errorMessage = '';
  @Input() saveMessage = '';
  @Output() createLocation = new EventEmitter<CreateLocationPayload>();

  createForm: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      label: ['Home', [Validators.required, Validators.maxLength(50)]],
      lat: [51.5, [Validators.required, Validators.min(-90), Validators.max(90)]],
      lon: [-0.12, [Validators.required, Validators.min(-180), Validators.max(180)]],
      tz: [0, [Validators.required, Validators.min(-12), Validators.max(14)]],
      dstDefault: [false],
    });
  }

  onCreateLocation(): void {
    if (this.createForm.invalid || this.saving) {
      this.createForm.markAllAsTouched();
      return;
    }

    const value = this.createForm.getRawValue();

    this.createLocation.emit({
      label: String(value.label),
      lat: Number(value.lat),
      lon: Number(value.lon),
      tz: Number(value.tz),
      dstDefault: Boolean(value.dstDefault),
    });
  }
}
