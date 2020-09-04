import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-titulo-arquetipo",
  template: `
  <!-- readonly -->
  <div class="text-center">
    <mat-form-field class="demo-full-width w-100" [formGroup]="group">
    <input matInput [formControlName]="field.name" [type]="field.inputType"  class="archetype-title font-weight-bold text-center" readonly>
    <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
    <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
    </ng-container>
    </mat-form-field>
  </div>
`,
  styles: [`
    .archetype-title{
      /*color:#59b0f3*/
      font-family: Lato;
	    font-style: normal;
      font-size: 16px;
      color: rgba(72,72,75,1);
    }
    
  `
  ]
})
export class TituloArquetipoComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() { }
  ngOnInit() { }
}
