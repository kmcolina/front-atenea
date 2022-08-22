import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMainComponent } from './show-main.component';

describe('ShowMainComponent', () => {
  let component: ShowMainComponent;
  let fixture: ComponentFixture<ShowMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
