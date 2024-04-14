/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'ngx-custom-carousel',
    templateUrl: './ngx-custom-carousel.component.html',
    styleUrls: ['./ngx-custom-carousel.component.scss'],
})
export class NgxCustomCarouselComponent
    implements OnChanges, OnInit, OnDestroy
{
    @Input() items: any[] = [];
    @Input() customItemTemplate!: TemplateRef<any>;
    @Input() delay: number = 2000;
    @Input() enableControls: boolean = false;

    @ViewChild('carouselItemTemplate', { static: true })
    carouselItemTemplate!: TemplateRef<any>;

    currentIndex = 0;
    intervalSubscription!: Subscription;
    isControleEnabled: boolean = false;

    ngOnChanges(changes: SimpleChanges): void {
        this.isControleEnabled = changes?.['enableControls'].currentValue;
    }

    ngOnInit(): void {
        this.startInterval();
    }

    startInterval(): void {
        this.intervalSubscription = interval(this.delay).subscribe(() => {
            this.next();
        });
    }

    stopInterval(): void {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
        }
    }

    next(): void {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }

    previous(): void {
        this.currentIndex =
            this.currentIndex === 0
                ? this.items.length - 1
                : this.currentIndex - 1;
    }

    jumpTo(index: number): void {
        if (this.currentIndex !== index) {
            this.currentIndex = index;
            this.stopInterval();
            this.startInterval();
        }
    }

    ngOnDestroy(): void {
        this.stopInterval();
    }
}
