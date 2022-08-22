import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserPanelComponent } from './show-user-panel.component';

describe('ShowUserPanelComponent', () => {
  let component: ShowUserPanelComponent;
  let fixture: ComponentFixture<ShowUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
