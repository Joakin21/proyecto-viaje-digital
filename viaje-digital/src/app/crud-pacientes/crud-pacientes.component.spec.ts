import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPacientesComponent } from './crud-pacientes.component';

describe('CrudPacientesComponent', () => {
  let component: CrudPacientesComponent;
  let fixture: ComponentFixture<CrudPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
