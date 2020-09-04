import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-button",
  template: `
<div class="demo-full-width margin-top ml-2" [formGroup]="group">
<button type="submit" class="lightblue-button" mat-raised-button color="primary">{{"ficha-paciente.Save" | translate}}</button>
</div>
`,
  styles: [
    `
    .lightblue-button{
      font-family: Lato;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      background-color: #59b0f3;
      color: white;
      border-radius: 7px;
    }
    `
  ]
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
