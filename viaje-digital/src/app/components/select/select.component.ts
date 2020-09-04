import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-select",
  template: `
<mat-form-field class="demo-full-width margin-topn ml-2 w-50" [formGroup]="group">
<mat-select class="text-basic" [placeholder]="field.label" [formControlName]="field.name">
<mat-option class="text-basic" *ngFor="let item of field.options" [value]="item">{{item}}</mat-option>
</mat-select>
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
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
