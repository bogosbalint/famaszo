import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAllQuestionsComponent } from './manage-all-questions.component';

describe('ManageAllQuestionsComponent', () => {
  let component: ManageAllQuestionsComponent;
  let fixture: ComponentFixture<ManageAllQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAllQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAllQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
