import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimientoItem } from './movimiento-item';

describe('MovimientoItem', () => {
  let component: MovimientoItem;
  let fixture: ComponentFixture<MovimientoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoItem],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientoItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
