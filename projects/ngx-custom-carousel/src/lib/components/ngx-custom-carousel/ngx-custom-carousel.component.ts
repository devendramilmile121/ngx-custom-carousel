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
import { signal } from '@angular/core';

@Component({
    selector: 'ngx-custom-carousel',
    templateUrl: './ngx-custom-carousel.component.html',
    styleUrls: ['./ngx-custom-carousel.component.scss'],
})
export class NgxCustomCarouselComponent
    implements OnInit, OnDestroy, OnChanges
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

    currentIndex = signal(0);
    intervalSubscription?: Subscription;
    isControlEnabled = signal(this.enableControls);
    autoSwitchEnabled = signal(this.enableAutoSwitch);
    intervalDelay = signal(this.delay);

    ngOnInit(): void {
        this.isControlEnabled.set(this.enableControls);
        this.autoSwitchEnabled.set(this.enableAutoSwitch);
        this.intervalDelay.set(this.delay);
        this.manageInterval();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['enableAutoSwitch']) {
            this.autoSwitchEnabled.set(
                changes['enableAutoSwitch'].currentValue
            );
        }

        if (changes['delay']) {
            this.intervalDelay.set(changes['delay'].currentValue);
        }

        if (changes['enableControls']) {
            this.isControlEnabled.set(
                changes['enableControls'].currentValue ?? false
            );
        }

        if (changes['enableAutoSwitch'] || changes['delay']) {
            this.manageInterval();
        }
    }

    manageInterval(): void {
        this.stopInterval();
        if (this.autoSwitchEnabled() && this.intervalDelay() > 0) {
            setTimeout(() => {
                this.startInterval();
            }, 100);
        }
    }

    startInterval(): void {
        if (this.autoSwitchEnabled() && !this.intervalSubscription) {
            this.intervalSubscription = interval(
                this.intervalDelay()
            ).subscribe(() => {
                this.next();
            });
        }
    }

    stopInterval(): void {
        if (this.intervalSubscription) {
            this.intervalSubscription.unsubscribe();
            this.intervalSubscription = undefined;
        }
    }

    next(): void {
        this.currentIndex.update(current => (current + 1) % this.items.length);
    }

    previous(): void {
        this.currentIndex.update(current =>
            current === 0 ? this.items.length - 1 : current - 1
        );
    }

    jumpTo(index: number): void {
        if (this.items.length === 0) {
            this.currentIndex.set(0);
            if (this.autoSwitchEnabled()) {
                this.manageInterval();
            }
            return;
        }

        if (index >= 0 && index < this.items.length) {
            if (this.currentIndex() !== index) {
                this.currentIndex.set(index);
                if (this.autoSwitchEnabled()) {
                    this.manageInterval();
                }
            }
        } else if (index >= this.items.length) {
            this.currentIndex.set(this.items.length - 1);
            if (this.autoSwitchEnabled()) {
                this.manageInterval();
            }
        }
    }

    ngOnDestroy(): void {
        this.stopInterval();
    }
}
