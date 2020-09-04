import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { FieldConfig, Validator } from "../../field.interface";

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
  <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
  <ng-container *ngFor="let field of fields;" dynamicField [field]="field" [group]="form">
  </ng-container>
  </form>
  `,
  styles: []
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  nodos_agregados_al_historial = []

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createControl();
  }
  verificarRepeticionNombre(nombre: string, forlulario: any): string {//borrar esta wea
    var claves_nodos_forlulario = Object.keys(forlulario)
    for (const clave of claves_nodos_forlulario) {
      if (nombre == clave) {
        console.log(nombre + " se repite")
        nombre = nombre + " I"
      }
    }
    return nombre

  }
  resetDatosCurrentSesionMedica() {
    //this.fields = []
    this.form = this.createControl();
    this.nodos_agregados_al_historial = []
  }

  agregarBoton(elemento: any) {
    this.nodos_agregados_al_historial.push(elemento.label)//prueba

    var boton_final = {
      type: "button",
      label: "Guardar y salir"
    }
    var last_of_fields = this.fields.length - 1
    this.fields[last_of_fields] = elemento
    this.fields.push(boton_final)

    const control1 = this.fb.control(
      this.fields[last_of_fields].name,
      this.bindValidations(this.fields[last_of_fields].validations || [])
    );
    this.form.addControl(elemento.name, control1)
    this.form.controls[elemento.name].setValue(elemento.label)
    //this.form = this.createControl()
  }
  onSubmit(event: Event) {
    console.log(this.form.value)
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      //this.submit.emit(this.nodos_agregados_al_historial)
      var datos = { "nombre_campos": this.nodos_agregados_al_historial, "valor_campos": this.form.value }
      this.submit.emit(datos);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControl() {
    const group = this.fb.group({});
    this.fields.forEach(field => {
      if (field.type === "button") return;
      const control = this.fb.control(
        field.value,
        this.bindValidations(field.validations || [])
      );
      group.addControl(field.name, control);
    });
    return group;
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(valid.validator);
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
