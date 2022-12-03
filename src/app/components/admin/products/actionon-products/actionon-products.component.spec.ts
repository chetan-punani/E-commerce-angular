import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiononProductsComponent } from './actionon-products.component';

describe('ActiononProductsComponent', () => {
  let component: ActiononProductsComponent;
  let fixture: ComponentFixture<ActiononProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiononProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiononProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
