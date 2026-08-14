import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPersonalComponent } from './tipos-personal.component';

describe('TiposPersonalComponent', () => {
  let component: TiposPersonalComponent;
  let fixture: ComponentFixture<TiposPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposPersonalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
