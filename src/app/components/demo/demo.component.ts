import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxCustomCarouselModule } from 'ngx-custom-carousel';
import { Subscription } from 'rxjs';
import { positiveIntegerValidator } from '../../validators/number-only.validator';
import { UserService } from '../../services/user.service';
import { User } from '../../types/paginated-user';

@Component({
    selector: 'app-demo',
    standalone: true,
    imports: [
        CommonModule,
        NgxCustomCarouselModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
    ],
    templateUrl: './demo.component.html',
    styleUrl: './demo.component.scss',
    providers: [UserService],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class DemoComponent implements OnInit, OnDestroy {
    itemsTemplate: User[] = [];
    private subs: Subscription[] = [];
    enableControls: boolean = true;
    enableAutoSwitch: boolean = true;
    delay = new FormControl('2000', [
        Validators.required,
        positiveIntegerValidator(),
    ]);
    loading: boolean = true;

    constructor(private us: UserService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        const sub = this.us.get().subscribe(
            res => {
                this.itemsTemplate = res.users;
                this.loading = false;
            },
            error => {
                this.loading = false;
                console.log(error);
            }
        );
        this.subs.push(sub);
    }

    get getDelay(): number {
        return this.delay.value ? +this.delay.value : 2000;
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }
}
