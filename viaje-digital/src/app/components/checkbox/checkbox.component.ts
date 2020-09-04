import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-checkbox",
  template: `
<div class="demo-full-width margin-top ml-2" [formGroup]="group" >
<mat-checkbox class="text-basic" [formControlName]="field.name">{{field.label}}</mat-checkbox>
</div>
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
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
