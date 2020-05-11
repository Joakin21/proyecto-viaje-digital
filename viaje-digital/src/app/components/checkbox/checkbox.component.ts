import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-checkbox",
  template: `
<div class="demo-full-width margin-top ml-2" [formGroup]="group" >
<mat-checkbox [formControlName]="field.name">{{field.label}}</mat-checkbox>
</div>
<br>
`,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
