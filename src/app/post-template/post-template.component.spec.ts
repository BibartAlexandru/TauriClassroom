import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTemplateComponent } from './post-template.component';

describe('PostTemplateComponent', () => {
  let component: PostTemplateComponent;
  let fixture: ComponentFixture<PostTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
