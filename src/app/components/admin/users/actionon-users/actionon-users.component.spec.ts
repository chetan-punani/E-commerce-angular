import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiononUsersComponent } from './actionon-users.component';

describe('ActiononUsersComponent', () => {
  let component: ActiononUsersComponent;
  let fixture: ComponentFixture<ActiononUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiononUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiononUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
