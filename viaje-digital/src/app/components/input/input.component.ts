import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-input",
  template: `
<mat-form-field class="demo-full-width w-75 ml-2" [formGroup]="group">
<input matInput class="text-basic" [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
<ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
<mat-error class="text-basic" *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
</ng-container>
</mat-form-field>
<br>
`,
  styles: [
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
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
