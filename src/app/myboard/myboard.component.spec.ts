import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyboardComponent } from './myboard.component';

describe('MyboardComponent', () => {
  let component: MyboardComponent;
  let fixture: ComponentFixture<MyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
