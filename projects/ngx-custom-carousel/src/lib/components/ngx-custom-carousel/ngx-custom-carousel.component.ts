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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() items: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() customItemTemplate!: TemplateRef<any>;
    @Input() delay: number = 2000;
    @Input() enableControls: boolean = false;
    @Input() enableAutoSwitch: boolean = false;

    @ViewChild('carouselItemTemplate', { static: true })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    carouselItemTemplate!: TemplateRef<any>;

    currentIndex: number = 0;
    intervalSubscription!: Subscription;
    isControlEnabled: boolean = false;

    ngOnInit(): void {
        this.isControlEnabled = this.enableControls;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['enableAutoSwitch']) {
            if (changes['enableAutoSwitch'].currentValue) {
                this.startInterval();
            } else {
                this.stopInterval();
            }
        }

        if (changes['enableAutoSwitch']) {
            this.isControlEnabled = changes['enableControls'].currentValue;
        }

        if (changes['delay'] && changes['delay'].currentValue > 0) {
            this.stopInterval();
            this.startInterval();
        }
    }

    startInterval(): void {
        if (this.enableAutoSwitch) {
            this.intervalSubscription = interval(this.delay).subscribe(() => {
                this.next();
            });
        }
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
            if (this.enableAutoSwitch) {
                this.stopInterval();
                this.startInterval();
            }
        }
    }

    ngOnDestroy(): void {
        this.stopInterval();
    }
}
