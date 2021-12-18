import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-profit-growth-form',
  templateUrl: './profit-growth-form.component.html',
  styleUrls: ['./profit-growth-form.component.scss']
})
export class ProfitGrowthFormComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  profitGrowthForm!: FormGroup;
  afterProfitGrowthForm!: FormGroup;

  ngOnInit() {
    this.profitGrowthForm = this._formBuilder.group({
      leads: [0, Validators.required],
      conversionAge: [0, Validators.required],
      customers: [{ value: '', disabled: true }, Validators.required],
      avgTransactions: [0, Validators.required],
      avgvalueOfTransactions: [0, Validators.required],
      revenue: [{ value: '', disabled: true }, Validators.required],
      ageMargin: [0, Validators.required],
      profit: [{ value: '', disabled: true }, Validators.required]
    })
    combineLatest([
      this.profitGrowthForm.get('leads')?.valueChanges,
      this.profitGrowthForm.get('conversionAge')?.valueChanges
    ]).subscribe(([leads, conversionAge]: any) => {
      this.profitGrowthForm.get('customers')?.setValue((leads * conversionAge) / 100)
    })
    combineLatest([
      this.profitGrowthForm.get('customers')?.valueChanges,
      this.profitGrowthForm.get('avgTransactions')?.valueChanges,
      this.profitGrowthForm.get('avgvalueOfTransactions')?.valueChanges,
    ]).subscribe(([customers, avgTransactions, avgvalueOfTransactions]: any) => {
      this.profitGrowthForm.get('revenue')?.setValue(customers * avgTransactions * avgvalueOfTransactions)
    })
    combineLatest([
      this.profitGrowthForm.get('revenue')?.valueChanges,
      this.profitGrowthForm.get('ageMargin')?.valueChanges
    ]).subscribe(([revenue, ageMargin]: any) => {
      this.profitGrowthForm.get('profit')?.setValue((revenue * ageMargin) / 100)
    })

    // Second doem initialize
    this.afterProfitGrowthForm = this._formBuilder.group({
      growthAge: [0, Validators.required],
      leads: [{ value: '', disabled: true }, Validators.required],
      conversionAge: [{ value: '', disabled: true }, Validators.required],
      customers: [{ value: '', disabled: true }, Validators.required],
      avgTransactions: [{ value: '', disabled: true }, Validators.required],
      avgvalueOfTransactions: [{ value: '', disabled: true }, Validators.required],
      revenue: [{ value: '', disabled: true }, Validators.required],
      ageMargin: [{ value: '', disabled: true }, Validators.required],
      profit: [{ value: '', disabled: true }, Validators.required],
      profitGrowthAge: [{ value: '', disabled: true }, Validators.required],
    })
    this.afterProfitGrowthForm.get('growthAge')?.valueChanges.subscribe(next => {
      this.afterProfitGrowthForm.get('leads')?.setValue((next * this.profitGrowthForm.get('leads')?.value) / 100)
    })
  }

}
