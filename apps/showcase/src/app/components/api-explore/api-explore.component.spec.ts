import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiExploreComponent } from './api-explore.component';

describe('ApiExploreComponent', () => {
  let component: ApiExploreComponent;
  let fixture: ComponentFixture<ApiExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiExploreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApiExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
