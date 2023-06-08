import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewDialogComponent } from './create-review-dialog.component';

describe('CreateReviewDialogComponent', () => {
  let component: CreateReviewDialogComponent;
  let fixture: ComponentFixture<CreateReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
