import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramaArquetiposComponent } from './diagrama-arquetipos.component';

describe('DiagramaArquetiposComponent', () => {
  let component: DiagramaArquetiposComponent;
  let fixture: ComponentFixture<DiagramaArquetiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramaArquetiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramaArquetiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
