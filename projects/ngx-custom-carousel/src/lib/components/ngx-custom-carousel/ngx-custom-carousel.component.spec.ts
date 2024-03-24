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
            component.startInterval();
            tick(2000);
            expect(component.next).toHaveBeenCalled();
            component.stopInterval(); // Stop interval to prevent timer errors
        }));
    });

    describe('stopInterval', () => {
        it('should stop interval', () => {
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

    describe('ngOnDestroy', () => {
        it('should unsubscribe from intervalSubscription', () => {
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
