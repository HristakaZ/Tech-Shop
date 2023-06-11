import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishOrderDialogComponent } from './finish-order-dialog.component';

describe('FinishOrderDialogComponent', () => {
  let component: FinishOrderDialogComponent;
  let fixture: ComponentFixture<FinishOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
