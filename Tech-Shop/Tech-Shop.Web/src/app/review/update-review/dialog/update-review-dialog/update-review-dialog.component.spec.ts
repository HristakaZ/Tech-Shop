import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReviewDialogComponent } from './update-review-dialog.component';

describe('UpdateReviewDialogComponent', () => {
  let component: UpdateReviewDialogComponent;
  let fixture: ComponentFixture<UpdateReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
