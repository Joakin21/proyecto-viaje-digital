import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProfesionalesSaludComponent } from './crud-profesionales-salud.component';

describe('CrudProfesionalesSaludComponent', () => {
  let component: CrudProfesionalesSaludComponent;
  let fixture: ComponentFixture<CrudProfesionalesSaludComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudProfesionalesSaludComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProfesionalesSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
