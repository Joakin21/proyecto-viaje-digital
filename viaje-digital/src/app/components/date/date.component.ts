import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-date",
  template: `
  <mat-form-field class="demo-full-width margin-top ml-2" [formGroup]="group">
  <input matInput class="text-basic" [matDatepicker]="picker" [formControlName]="field.name" [placeholder]="field.label">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
  <mat-hint></mat-hint>
  <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
  <mat-error class="text-basic" *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
  </ng-container>
  </mat-form-field>
  <br>
`,
  styles: 
  [
    `
    .text-basic{
      font-family: Lato;
      font-style: normal;
      font-size: 16px;
      color: rgba(72,72,75,1);
    }
    `
  ]
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
