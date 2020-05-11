import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-textarea",
  template: `
  <mat-form-field class="demo-full-width w-50 ml-2" [formGroup]="group">
  <textarea matInput [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType"></textarea>
  <ng-container *ngFor="let validation of field.validations;" ngProjectAs="mat-error">
  <mat-error *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</mat-error>
  </ng-container>

  </mat-form-field>
  
 
  <br>
  `
,
  styles: []
})
export class TextareaComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
