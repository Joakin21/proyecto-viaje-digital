import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-titulo-estructural",
  template: `
  <!-- readonly -->
  
    <mat-form-field class="demo-full-width w-25" [formGroup]="group">
    <input matInput [formControlName]="field.name" [type]="field.inputType" class="font-weight-bold" readonly>
    <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
    <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
    </ng-container>
    </mat-form-field>
    <br>
`,
  styles: []
})
export class TituloEstructuralComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
