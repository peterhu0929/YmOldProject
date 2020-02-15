import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchRateProductionComponent } from './ExchRateProductionComponent';

describe('ExchRateProductionComponent', () => {
  let component: ExchRateProductionComponent;
  let fixture: ComponentFixture<ExchRateProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchRateProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchRateProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
