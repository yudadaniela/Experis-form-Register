import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationProductsComponent } from './form-creation-products.component';

describe('FormCreationProductsComponent', () => {
  let component: FormCreationProductsComponent;
  let fixture: ComponentFixture<FormCreationProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreationProductsComponent]
    });
    fixture = TestBed.createComponent(FormCreationProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
