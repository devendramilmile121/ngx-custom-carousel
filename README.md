# ngx-custom-carousel

ngx-custom-carousel is a feature-rich Angular 17 component crafted to elevate your carousel experience. Seamlessly integrated with Angular, this library offers swipe functionality for smooth content navigation on various devices. The carousel comes equipped with next and forward buttons, enhancing user interaction. While these buttons maintain a sleek design for consistency, ngx-custom-carousel empowers users to fully customize carousel templates to suit their unique needs. Whether showcasing images, products, or other content, ngx-custom-carousel delivers a dynamic and intuitive solution for creating captivating carousels in Angular applications.

### Features

-   Support for custom template using `<ng-template>` tag.
-   Swipe left and swipe right gestures for navigation.
-   Previous Next buttons
-   Turn on/off auto switch and control using next and previous buttons
-   Auto pause if hove on the item to make content readable

## Installation

Install `ngx-custom-carousel` via npm:

```bash
npm  install  ngx-custom-carousel  --save
```

## Demo

[Demo and API Reference](https://devendramilmile121.github.io/ngx-custom-carousel/)

[![portfolio](https://camo.githubusercontent.com/d0564aee63e39899cbe989b7cb3316dce83277e87ca6f5f68f09aa7fdabbe214/68747470733a2f2f692e696d6775722e636f6d2f767232614267412e706e67)](https://stackblitz.com/edit/stackblitz-starters-jr9c9d?file=src%2Fmain.ts)

## Usage

1. Import the `NgxCustomCarouselModule` in your Angular module:

```typescript
import { NgxCustomCarouselModule } from 'ngx-custom-carousel';

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
        <ngx-custom-carousel
            [items]="itemsTemplate"
            [customItemTemplate]="userDetailsTemplate"
            [delay]="5000"
            [enableControls]="true"
            [enableAutoSwitch]="true"></ngx-custom-carousel>
    </div>
</div>
```

3. Define a custom template using the `<ng-template>` element for displaying user details:

```html
<ng-template #userDetailsTemplate let-item let-index="index">
    <div>Use your own html</div>
</ng-template>
```
