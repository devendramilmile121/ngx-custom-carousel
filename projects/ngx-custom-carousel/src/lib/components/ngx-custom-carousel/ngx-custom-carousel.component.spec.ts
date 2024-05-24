import {
    ComponentFixture,
    TestBed,
    discardPeriodicTasks,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { NgxCustomCarouselComponent } from './ngx-custom-carousel.component';

describe('NgxCustomCarouselComponent', () => {
    let component: NgxCustomCarouselComponent;
    let fixture: ComponentFixture<NgxCustomCarouselComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NgxCustomCarouselComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxCustomCarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        if (component.intervalSubscription) {
            component.intervalSubscription.unsubscribe();
        }
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize controlEnabled with enableControls input', () => {
        component.enableControls = true;
        component.ngOnInit();
        expect(component.isControlEnabled()).toBe(true);
    });

    it('should initialize autoSwitchEnabled with enableAutoSwitch input', () => {
        component.enableAutoSwitch = true;
        component.ngOnInit();
        expect(component.autoSwitchEnabled()).toBe(true);
    });

    it('should initialize intervalDelay with delay input', () => {
        component.delay = 3000;
        component.ngOnInit();
        expect(component.intervalDelay()).toBe(3000);
    });

    it('should update autoSwitchEnabled on input change', () => {
        component.enableAutoSwitch = true;
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: true,
                previousValue: false,
                firstChange: false,
                isFirstChange: () => false,
            },
        });
        expect(component.autoSwitchEnabled()).toBe(true);
    });

    it('should update intervalDelay on input change', () => {
        component.delay = 5000;
        component.ngOnChanges({
            delay: {
                currentValue: 5000,
                previousValue: 2000,
                firstChange: false,
                isFirstChange: () => false,
            },
        });
        expect(component.intervalDelay()).toBe(5000);
    });

    it('should update isControlEnabled on input change', () => {
        component.enableControls = true;
        component.ngOnChanges({
            enableControls: {
                currentValue: true,
                previousValue: false,
                firstChange: false,
                isFirstChange: () => false,
            },
        });
        expect(component.isControlEnabled()).toBe(true);
    });

    it('should start interval on manageInterval if autoSwitchEnabled is true and delay > 0', fakeAsync(() => {
        component.enableAutoSwitch = true;
        component.delay = 200;
        component.ngOnInit();
        spyOn(component, 'startInterval').and.callThrough();
        tick(1000); // Simulate passage of time
        expect(component.startInterval).toHaveBeenCalled();
        discardPeriodicTasks();
    }));

    it('should stop interval on manageInterval if autoSwitchEnabled is false', () => {
        component.enableAutoSwitch = false;
        spyOn(component, 'stopInterval');
        component.manageInterval();
        expect(component.stopInterval).toHaveBeenCalled();
    });

    it('should call next method when interval elapses', fakeAsync(() => {
        component.items = [1, 2, 3];
        component.enableAutoSwitch = true;
        component.delay = 100;
        spyOn(component, 'next');
        component.ngOnInit();
        component.manageInterval();
        tick(200); // Simulate passage of time
        expect(component.next).toHaveBeenCalled();
        discardPeriodicTasks();
    }));

    it('should correctly set currentIndex to the next value', () => {
        component.items = [1, 2, 3];
        component.currentIndex.set(0);
        component.next();
        expect(component.currentIndex()).toBe(1);
    });

    it('should correctly set currentIndex to the previous value', () => {
        component.items = [1, 2, 3];
        component.currentIndex.set(1);
        component.previous();
        expect(component.currentIndex()).toBe(0);
    });

    it('should correctly jump to specified index', () => {
        component.items = [1, 2, 3];
        component.jumpTo(2);
        expect(component.currentIndex()).toBe(2);
    });

    it('should stop interval on ngOnDestroy', () => {
        spyOn(component, 'stopInterval');
        component.ngOnDestroy();
        expect(component.stopInterval).toHaveBeenCalled();
    });

    it('should not start a new interval if one is already running', () => {
        component.enableAutoSwitch = true;
        component.delay = 1000;
        component.ngOnInit();
        component.startInterval();
        const initialSubscription = component.intervalSubscription;
        component.startInterval();
        expect(component.intervalSubscription).toBe(initialSubscription);
    });

    it('should handle zero items gracefully in jumpTo method', () => {
        component.items = [];
        component.jumpTo(1);
        expect(component.currentIndex()).toBe(0);
    });

    it('should correctly handle out of bounds index in jumpTo method', () => {
        component.items = [1, 2, 3];
        component.jumpTo(5);
        expect(component.currentIndex()).toBe(2);
    });

    it('should correctly restart interval when enableAutoSwitch changes to true', fakeAsync(() => {
        component.enableAutoSwitch = false;
        component.ngOnInit();
        spyOn(component, 'startInterval');
        component.ngOnChanges({
            enableAutoSwitch: {
                currentValue: true,
                previousValue: false,
                firstChange: false,
                isFirstChange: () => false,
            },
        });
        tick(150); // Simulate passage of time
        expect(component.startInterval).toHaveBeenCalled();
    }));

    it('should correctly restart interval when delay changes', fakeAsync(() => {
        component.enableAutoSwitch = true;
        component.ngOnInit();
        spyOn(component, 'startInterval');
        component.ngOnChanges({
            delay: {
                currentValue: 3000,
                previousValue: 2000,
                firstChange: false,
                isFirstChange: () => false,
            },
        });
        tick(150); // Simulate passage of time
        expect(component.startInterval).toHaveBeenCalled();
    }));
});
