import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCustomCarouselComponent } from './components/ngx-custom-carousel/ngx-custom-carousel.component';
import { NgxSwipeDirective } from './directive/swipe.directive';

@NgModule({
    declarations: [NgxCustomCarouselComponent, NgxSwipeDirective],
    imports: [CommonModule],
    exports: [NgxCustomCarouselComponent],
})
export class NgxCustomCarouselModule {}
