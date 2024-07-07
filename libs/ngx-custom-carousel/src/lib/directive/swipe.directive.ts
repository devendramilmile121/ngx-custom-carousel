import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[ngxSwipe]',
})
export class NgxSwipeDirective {
    private startX!: number;
    private startY!: number;
    private threshold = 50;
    private allowedTime = 300;

    @Output() swipeLeft = new EventEmitter<void>();
    @Output() swipeRight = new EventEmitter<void>();

    constructor() {}

    @HostListener('touchstart', ['$event'])
    @HostListener('mousedown', ['$event'])
    onTouchStart(event: TouchEvent | MouseEvent) {
        const touch = event instanceof TouchEvent ? event.touches[0] : event;
        this.startX = touch.clientX;
        this.startY = touch.clientY;
    }

    @HostListener('touchend', ['$event'])
    @HostListener('mouseup', ['$event'])
    onTouchEnd(event: TouchEvent | MouseEvent) {
        const touch =
            event instanceof TouchEvent ? event.changedTouches[0] : event;
        const distX = touch.clientX - this.startX;
        const distY = touch.clientY - this.startY;
        const elapsedTime = event.timeStamp - event.timeStamp;

        if (elapsedTime <= this.allowedTime) {
            if (
                Math.abs(distX) >= this.threshold &&
                Math.abs(distY) <= this.threshold
            ) {
                if (distX > 0) {
                    this.swipeRight.emit();
                } else {
                    this.swipeLeft.emit();
                }
            }
        }
    }
}
