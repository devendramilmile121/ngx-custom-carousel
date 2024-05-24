# ngx-custom-carousel
<p align="center">
  <a href="#badge">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
  <a href="https://github.com/devendramilmile121/ngx-custom-carousel/actions?query=workflow%3Aangular+branch%3Amaster">
    <img alt="Build states" src="https://github.com/devendramilmile121/ngx-custom-carousel/actions/workflows/publish.yml/badge.svg">
  </a>
</p>
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

## Usage

1. Import the `NgxCustomCarouselModule` in your Angular module:

```typescript
import { NgxCustomCarouselModule } from 'ngx-custom-carousel';

@NgModule({
    imports: [NgxCustomCarouselModule],
})
export class YourModule {}
```

2. Use the `<ngx-custom-carousel>` element in your component's template to display a carousel:

```html
<div class="container">
    <div class="hw-full">
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
