import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-api-explore',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './api-explore.component.html',
    styleUrl: './api-explore.component.scss',
})
export class ApiExploreComponent {
    displayedColumns: string[] = ['name', 'description'];
    dataSource = [
        {
            name: 'items',
            description: 'Array of items which is going to show in carousel',
        },
        {
            name: 'customItemTemplate',
            description:
                'Custom html wrap in <ng-template let-item let-index="index"> <ng-template/>',
        },
        {
            name: 'delay',
            description:
                'Time span in second after evey defined time it will switch to next item',
        },
        {
            name: 'enableControls',
            description:
                'Accepts boolean value if sets true then it will show button on left and right which will able to switch previous and next item',
        },
        {
            name: 'enableAutoSwitch',
            description:
                'Accepts boolean value if sets true then it will switch items every defined time interval',
        },
    ];
}
