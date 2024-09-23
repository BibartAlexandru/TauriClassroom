import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemsComponent } from './edit-items.component';

describe('EditItemsComponent', () => {
  let component: EditItemsComponent;
  let fixture: ComponentFixture<EditItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
