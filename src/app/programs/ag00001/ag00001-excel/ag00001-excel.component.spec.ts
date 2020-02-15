import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ag00001ExcelComponent } from './ag00001-excel.component';

describe('Ag00001ExcelComponent', () => {
  let component: Ag00001ExcelComponent;
  let fixture: ComponentFixture<Ag00001ExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ag00001ExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ag00001ExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
