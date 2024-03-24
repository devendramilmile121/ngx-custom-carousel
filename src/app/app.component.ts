import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FAKE_USER_DETAILS } from './data/users/fake-users';
import { User } from './types/user';
import { NgxCustomCarouselModule } from 'ngx-custom-carousel';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NgxCustomCarouselModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'simple-carousel';
    items: string[] = ['Test1', 'Test2', 'Test3'];
    itemsTemplate: User[] = FAKE_USER_DETAILS;
}
