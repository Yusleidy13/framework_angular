import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEscuelaComponent } from './datos-escuela.component';

describe('DatosEscuelaComponent', () => {
  let component: DatosEscuelaComponent;
  let fixture: ComponentFixture<DatosEscuelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosEscuelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
