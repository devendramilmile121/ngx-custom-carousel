import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';

import { NgxCustomCarouselComponent } from './ngx-custom-carousel.component';
import { NgxCustomCarouselModule } from '../../ngx-custom-carousel.module';

describe('NgxCustomCarouselComponent', () => {
    let component: NgxCustomCarouselComponent;
    let fixture: ComponentFixture<NgxCustomCarouselComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgxCustomCarouselModule],
        }).compileComponents();

        fixture = TestBed.createComponent(NgxCustomCarouselComponent);
        component = fixture.componentInstance;
        component.items = [1, 2, 3];
        component.delay = 2000;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        fixture.destroy();
    });

    describe('startInterval', () => {
        it('should start interval and call next method', fakeAsync(() => {
            spyOn(component, 'next');
            component.enableAutoSwitch = true;
            component.startInterval();
            tick(2000);
            expect(component.next).toHaveBeenCalled();
            component.stopInterval(); // Stop interval to prevent timer errors
        }));
        it('should not start interval if enableAutoSwitch is false', fakeAsync(() => {
            spyOn(component, 'next');
            component.enableAutoSwitch = false;
            component.startInterval();
            tick(2000);
            expect(component.next).not.toHaveBeenCalled();
            component.stopInterval(); // Stop interval to prevent timer errors
        }));
    });

    describe('stopInterval', () => {
        it('should stop interval', () => {
            component.enableAutoSwitch = true;
            component.startInterval();
            component.stopInterval();
            expect(component.intervalSubscription.closed).toBe(true);
        });

        it('should not throw error if intervalSubscription is not initialized', () => {
            expect(() => component.stopInterval()).not.toThrowError();
        });
    });

    describe('jumpTo', () => {
        it('should set currentIndex to the specified index and not restart interval if already at index', fakeAsync(() => {
            spyOn(component, 'startInterval');
            component.currentIndex = 1;
            component.jumpTo(1);
            expect(component.currentIndex).toBe(1);
            expect(component.startInterval).not.toHaveBeenCalled();
        }));
    });

    describe('next', () => {
        it('should increment currentIndex by 1', () => {
            component.currentIndex = 1;
            component.next();
            expect(component.currentIndex).toBe(2);
        });
    });

    describe('previous', () => {
        it('should decrement currentIndex by 1', () => {
            component.currentIndex = 2;
            component.previous();
            expect(component.currentIndex).toBe(1);
        });
    });

    describe('ngOnDestroy', () => {
        it('should unsubscribe from intervalSubscription', () => {
            component.enableAutoSwitch = true;
            component.startInterval();
            spyOn(component.intervalSubscription, 'unsubscribe');
            component.ngOnDestroy();
            expect(
                component.intervalSubscription.unsubscribe
            ).toHaveBeenCalled();
        });

        it('should not throw error if intervalSubscription is not initialized', () => {
            expect(() => component.ngOnDestroy()).not.toThrowError();
        });
    });
});
