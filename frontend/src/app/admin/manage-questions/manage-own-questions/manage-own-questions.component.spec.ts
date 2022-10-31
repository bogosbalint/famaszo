import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOwnQuestionsComponent } from './manage-own-questions.component';

describe('ManageOwnQuestionsComponent', () => {
  let component: ManageOwnQuestionsComponent;
  let fixture: ComponentFixture<ManageOwnQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOwnQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOwnQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
