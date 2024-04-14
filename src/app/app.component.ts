import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxCustomCarouselModule } from 'ngx-custom-carousel';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './types/paginated-user';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        NgxCustomCarouselModule,
        HttpClientModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [UserService],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Ngx-Custom-Carousel Showcase';
    itemsTemplate: User[] = [];
    private subs: Subscription[] = [];

    constructor(private us: UserService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        const sub = this.us.get().subscribe((res) => {
            this.itemsTemplate = res.users;
        });
        this.subs.push(sub);
    }

    ngOnDestroy(): void {
        this.subs.forEach((sub) => sub.unsubscribe());
    }
}
