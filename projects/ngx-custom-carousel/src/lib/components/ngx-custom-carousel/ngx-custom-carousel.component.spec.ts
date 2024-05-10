import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { NgxCustomCarouselComponent } from './ngx-custom-carousel.component';
import { Subscription } from 'rxjs';

describe('NgxCustomCarouselComponent', () => {
    let component: NgxCustomCarouselComponent;
    let fixture: ComponentFixture<NgxCustomCarouselComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgxCustomCarouselComponent],
        });
        fixture = TestBed.createComponent(NgxCustomCarouselComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
        expect(component.items).toEqual([]);
        expect(component.customItemTemplate).toBeUndefined();
        expect(component.delay).toBe(2000);
        expect(component.enableControls).toBe(false);
        expect(component.enableAutoSwitch).toBe(false);
        expect(component.currentIndex).toBe(0);
        expect(component.intervalSubscription).toBeUndefined();
        expect(component.isControlEnabled).toBe(false);
    });

    it('should start and stop interval on enableAutoSwitch change', () => {
        component.enableAutoSwitch = true;
        component.delay = 1000;
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: true,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        expect(component.intervalSubscription).toBeDefined();

        component.enableAutoSwitch = false;
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: false,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        expect(component.intervalSubscription?.closed).toBe(true);
    });

    it('should start and stop interval on delay change', () => {
        component.enableAutoSwitch = true;
        component.delay = 1000;
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: true,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        expect(component.intervalSubscription).toBeDefined();

        component.ngOnChanges({
            delay: {
                currentValue: 2000,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        expect(component.intervalSubscription?.closed).toBe(true);

        component.ngOnChanges({
            delay: {
                currentValue: 1000,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        expect(component.intervalSubscription).toBeDefined();
    });

    it('should set currentIndex to next item on next()', () => {
        component.items = [1, 2, 3, 4];
        component.currentIndex = 0;
        component.next();

        expect(component.currentIndex).toBe(1);

        component.currentIndex = 3;
        component.next();

        expect(component.currentIndex).toBe(0);
    });

    it('should set currentIndex to previous item on previous()', () => {
        component.items = [1, 2, 3, 4];
        component.currentIndex = 3;
        component.previous();

        expect(component.currentIndex).toBe(2);

        component.currentIndex = 0;
        component.previous();

        expect(component.currentIndex).toBe(3);
    });

    it('should jump to the specified index on jumpTo()', () => {
        spyOn(component, 'startInterval');
        spyOn(component, 'stopInterval');
        component.items = [1, 2, 3, 4];
        component.currentIndex = 0;
        component.enableAutoSwitch = true;
        component.jumpTo(2);

        expect(component.stopInterval).toHaveBeenCalled();
        expect(component.startInterval).toHaveBeenCalled();
        expect(component.currentIndex).toBe(2);

        component.jumpTo(0);

        expect(component.stopInterval).toHaveBeenCalled();
        expect(component.startInterval).toHaveBeenCalled();
        expect(component.currentIndex).toBe(0);
    });

    it('should start and stop interval on jumpTo() if enableAutoSwitch is true', () => {
        component.items = [1, 2, 3, 4];
        component.enableAutoSwitch = true;
        component.delay = 1000;
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: true,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        spyOn(component, 'startInterval');
        spyOn(component, 'stopInterval');

        component.jumpTo(2);

        expect(component.stopInterval).toHaveBeenCalled();
        expect(component.startInterval).toHaveBeenCalled();
    });

    it('should set isControlEnabled to enableControls value on ngOnChanges()', () => {
        component.ngOnChanges({
            enableControls: {
                currentValue: true,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        expect(component.isControlEnabled).toBe(true);

        component.ngOnChanges({
            enableControls: {
                currentValue: false,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });

        expect(component.isControlEnabled).toBe(false);
    });

    it('should unsubscribe from interval on ngOnDestroy()', () => {
        component.intervalSubscription = new Subscription();
        spyOn(component.intervalSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(component.intervalSubscription.unsubscribe).toHaveBeenCalled();
    });

    it('should handle jumping to last item if index is greater than items array length', () => {
        component.items = [1, 2, 3, 4];
        component.jumpTo(5);
        expect(component.currentIndex).toBe(3);
    });

    it('should not jump if index is equal to current index', () => {
        component.items = [1, 2, 3, 4];
        component.currentIndex = 2;
        component.jumpTo(2);
        expect(component.currentIndex).toBe(2);
    });

    it('should handle empty items array', () => {
        component.items = [];
        component.jumpTo(0);
        expect(component.currentIndex).toBe(0);
    });

    it('should handle delay set to 0', () => {
        component.enableAutoSwitch = true;
        component.delay = 0;
        component.ngOnChanges({
            delay: {
                currentValue: 0,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.intervalSubscription).toBeUndefined();
    });

    it('should handle delay set to 0 and then to a positive value', () => {
        component.enableAutoSwitch = true;
        component.delay = 0;
        component.ngOnChanges({
            delay: {
                currentValue: 0,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.intervalSubscription).toBeUndefined();

        component.delay = 1000;
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: 1000,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
            delay: {
                currentValue: 1000,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.intervalSubscription).toBeDefined();
    });

    it('should handle delay set to 0 and then to a negative value', () => {
        component.enableAutoSwitch = true;
        component.delay = 0;
        component.ngOnChanges({
            delay: {
                currentValue: 0,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.intervalSubscription).toBeUndefined();

        component.delay = -1000;
        component.ngOnChanges({
            delay: {
                currentValue: -1000,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.intervalSubscription).toBeUndefined();
    });

    it('should not start interval if enableAutoSwitch is false on ngOnChanges()', () => {
        spyOn(component, 'startInterval');
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: false,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.startInterval).not.toHaveBeenCalled();
    });

    it('should not start interval if delay is 0 on ngOnChanges()', () => {
        spyOn(component, 'startInterval');
        component.delay = 0;
        component.ngOnChanges({
            delay: {
                currentValue: 0,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.startInterval).not.toHaveBeenCalled();
    });

    it('should stop interval if delay is 0 on ngOnChanges()', () => {
        spyOn(component, 'stopInterval');
        component.delay = 0;
        component.ngOnChanges({
            delay: {
                currentValue: 0,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        expect(component.stopInterval).toHaveBeenCalled();
    });

    it('should not start interval if enableAutoSwitch is false on jumpTo()', () => {
        component.items = [1, 2, 3, 4];
        component.enableAutoSwitch = false;
        spyOn(component, 'startInterval');
        component.jumpTo(2);
        expect(component.startInterval).not.toHaveBeenCalled();
    });

    it('should handle jumping to last item if index is equal to items array length', () => {
        component.items = [1, 2, 3, 4];
        component.jumpTo(4);
        expect(component.currentIndex).toBe(3);
    });

    it('should handle jumping to last item if index is greater than items array length', () => {
        component.items = [1, 2, 3, 4];
        component.jumpTo(5);
        expect(component.currentIndex).toBe(3);
    });

    it('should not start interval if enableAutoSwitch is false on jumpTo()', () => {
        component.items = [1, 2, 3, 4];
        component.enableAutoSwitch = false;
        spyOn(component, 'startInterval');
        component.jumpTo(2);
        expect(component.startInterval).not.toHaveBeenCalled();
    });

    it('should set isControlEnabled to enableControls value on ngOnInit()', () => {
        component.enableControls = true;
        component.ngOnInit();
        expect(component.isControlEnabled).toBe(true);

        component.enableControls = false;
        component.ngOnInit();
        expect(component.isControlEnabled).toBe(false);
    });

    it('should start interval after a delay change when delay is greater than 0', fakeAsync(() => {
        spyOn(component, 'startInterval');
        spyOn(component, 'stopInterval');
        component.delay = 2000;
        component.ngOnChanges({
            delay: {
                currentValue: 2000,
                previousValue: undefined,
                firstChange: false,
                isFirstChange: function (): boolean {
                    return false;
                },
            },
        });
        tick(100);
        expect(component.startInterval).toHaveBeenCalled();
    }));

    it('should call next() when interval emits a value', fakeAsync(() => {
        spyOn(component, 'next');
        component.enableAutoSwitch = true;
        component.delay = 1000;
        component.startInterval();
        expect(component.next).not.toHaveBeenCalled();
        tick(1000);
        expect(component.next).toHaveBeenCalled();
        component.stopInterval();
    }));
});
