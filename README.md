# Engaging Networks Delicious Range Slider

This project gives you a beautiful and completely customizable Range Slider for your Donation Amounts on Engaging Networks.

## How to use

1. Add the script below to the page:

```html
<script
  type="text/javascript"
  src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/44/en-range-slider.js"
  defer
></script>
```

2. You need to add an container where you want to display the slider:

```html
<div
  id="en-range-slider"
  data-min="5"
  data-max="100"
  data-step="1"
  data-default-amount="10"
  data-one-time-label="one time"
  data-monthly-label="monthly"
  data-annual-label="annual"
></div>
```

You have a lot of options to customize the slider. See below for more information.

## Slider Options

Every option can be set as a data attribute on the `#en-range-slider` container DIV.

- **min**: The minimum amount that can be selected. Defaults to `5`.
- **min-message**: The message that will be displayed when the minimum amount is selected. Defaults to `Please insert a minimum of 5 Euro`.
- **max**: The maximum amount that can be selected. Defaults to `100`.
- **max-message**: The message that will be displayed when the maximum amount is selected. Defaults to `You can donate as much as you like, please insert the amount of your choice below`.
- **step**: The amount that will be added to the slider when the user drags the handle. Defaults to `1`.
- **default-amount**: The amount that will be selected by default. Defaults to `10`.
- **currency-symbol**: The currency symbol that will be displayed. Defaults to the correct symbol for the Engaging Networks "Payment Currency" hidden field.
- **currency-position**: The position of the currency symbol. Defaults to `left`.
- **form**: Whether or not you want to show the frequency buttons and the "other amount" input. Defaults to `true`.
- **one-time-label**: The label for the one time button. Defaults to empty. If not set, the button will not be displayed.
- **monthly-label**: The label for the monthly button. Defaults to empty. If not set, the button will not be displayed.
- **annual-label**: The label for the annual button. Defaults to empty. If not set, the button will not be displayed.
- **selected-frequency**: The frequency that will be selected by default. Defaults to `onetime`. Can be `onetime`, `monthly` or `annual`.

## Color Options

You can also set data attributes on the `#en-range-slider` container DIV to change the colors of the slider.

- **color-bg**: The background color of the slider track. Defaults to `#009fe3`.
- **color-txt**: The text color of the slider track. Defaults to `#fff`.
- **color-form-txt**: The text color of the form message text. Defaults to `#aaaaaa`.
- **color-thumb**: The color of the slider handle. Defaults to `#ffb800`.
- **color-thumb-hover**: The color of the slider handle when the user hovers over it. Defaults to `#e5a500`.
- **color-thumb-active**: The color of the slider handle when the user clicks on it. Defaults to `#008fcc`.

**Example of `#en-range-slider` container DIV with all options set:**

```html
<div
  id="en-range-slider"
  data-min="5"
  data-min-message="Please insert a minimum of 5 Euro"
  data-max="100"
  data-max-message="You can donate as much as you like, please insert the amount of your choice below"
  data-step="1"
  data-default-amount="10"
  data-one-time-label="one time"
  data-monthly-label="monthly"
  data-annual-label="annual"
  data-currency-symbol="€"
  data-currency-position="left"
  data-form="true"
  data-color-bg="#009fe3"
  data-color-txt="#ffffff"
  data-color-form-txt="#aaaaaa"
  data-color-thumb="#ffb800"
  data-color-thumb-hover="#e5a500"
  data-color-thumb-active="#008fcc"
></div>
```

### IMPORTANT: This project only works with the Engaging Networks Pages.

## Development

Your js code must be on the `src/app.ts` file. Styling changes must be on `src/sass`.

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build` - Builds the project

It's going to create a `dist` folder, where you can get the `en-range-slider.js` file and publish it.

## Hot Module Reloading

1. `npm run start` - Starts the server with hot reloading enabled

## Demo

https://action.peta.de/page/104813/donate/1?mode=DEMO

It's currently published on PETA Germany EN Account:  
https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/44/en-range-slider.js
