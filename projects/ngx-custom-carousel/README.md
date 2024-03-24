# ngx-custom-carousel

Angular library for a customizable carousel component with support for custom templates and swipe gestures.

## Installation

Install `ngx-custom-carousel` via npm:

```bash
npm install ngx-custom-carousel --save
```

## Demo

[![portfolio](https://camo.githubusercontent.com/d0564aee63e39899cbe989b7cb3316dce83277e87ca6f5f68f09aa7fdabbe214/68747470733a2f2f692e696d6775722e636f6d2f767232614267412e706e67)](https://stackblitz.com/edit/stackblitz-starters-jr9c9d?file=src%2Fmain.ts)

## Usage

1. Import the `NgxCustomCarouselModule` in your Angular module:

    ```typescript
    import { NgxCustomCarouselModule } from "ngx-custom-carousel";

    @NgModule({
        imports: [NgxCustomCarouselModule],
    })
    export class YourModule {}
    ```

2. Use the `<ngx-custom-carousel>` element in your component's template to display a carousel with string items:

    ```html
    <div class="container">
        <div class="hw-full">
            <h3>String Items</h3>
            <ngx-custom-carousel [items]="items"></ngx-custom-carousel>
        </div>
        <div class="hw-full">
            <h3>With Custom Template</h3>
            <ngx-custom-carousel [items]="itemsTemplate" [customItemTemplate]="userDetailsTemplate" [delay]="5000"></ngx-custom-carousel>
        </div>
    </div>
    ```

3. Define a custom template using the `<ng-template>` element for displaying user details:

    ```html
    <ng-template #userDetailsTemplate let-item let-index="index">
        <div>Use your own html</div>
    </ng-template>
    ```

### Features

-   Support for custom template using `<ng-template>` tag.
-   Swipe left and swipe right gestures for navigation.
