import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRapidoComponent } from './buscador-rapido.component';

describe('BuscadorRapidoComponent', () => {
  let component: BuscadorRapidoComponent;
  let fixture: ComponentFixture<BuscadorRapidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorRapidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
