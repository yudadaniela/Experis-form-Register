import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetailProductsComponent } from './form-detail-products.component';

describe('FormDetailProductsComponent', () => {
  let component: FormDetailProductsComponent;
  let fixture: ComponentFixture<FormDetailProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDetailProductsComponent]
    });
    fixture = TestBed.createComponent(FormDetailProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
