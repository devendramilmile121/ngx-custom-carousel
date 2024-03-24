import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCustomCarouselComponent } from './ngx-custom-carousel.component';

describe('NgxCustomCarouselComponent', () => {
  let component: NgxCustomCarouselComponent;
  let fixture: ComponentFixture<NgxCustomCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCustomCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCustomCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
