import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDashComponent } from './quiz-dash.component';

describe('QuizDashComponent', () => {
  let component: QuizDashComponent;
  let fixture: ComponentFixture<QuizDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
