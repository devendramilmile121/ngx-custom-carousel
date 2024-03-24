import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'ngx-custom-carousel',
    templateUrl: './ngx-custom-carousel.component.html',
    styleUrls: ['./ngx-custom-carousel.component.scss'],
})
export class NgxCustomCarouselComponent implements OnInit, OnDestroy {
    @Input() items: any[] = [];
    @Input() customItemTemplate!: TemplateRef<any>;
    @Input() delay: number = 2000;

    @ViewChild('carouselItemTemplate', { static: true })
    carouselItemTemplate!: TemplateRef<any>;

    currentIndex = 0;
    intervalSubscription!: Subscription;

    ngOnInit() {
        this.startInterval();
    }

    startInterval() {
        this.intervalSubscription = interval(this.delay).subscribe(() => {
            this.next();
        });
    }

    stopInterval() {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
        }
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }

    previous() {
        this.currentIndex =
            this.currentIndex === 0
                ? this.items.length - 1
                : this.currentIndex - 1;
    }

    jumpTo(index: number) {
        if (this.currentIndex !== index) {
            this.currentIndex = index;
            this.stopInterval();
            this.startInterval();
        }
    }

    ngOnDestroy() {
        this.stopInterval();
    }
}
