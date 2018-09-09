# example-vue-wc (Work in progress)

Example of a web component built using VueJs

# How to use

_How to use this component in different applications with different frameworks._

## No Framework

Refer to the index.html and index-no-deps.html for an example of how to use the component with no framework.

1. Basically include the script file in your html page:

```html
<script src="dist/thenja-login-form.bundle.umd.js"></script>
```

2. Now you can add the component into your html markup

```html
<thenja-login-form title="Please Login!" id="form-one"></thenja-login-form>
```

3. In javascript you can listen to events or pass data to the web component:

```javascript
var formOne = document.getElementById('form-one');

// listen to events being fired from the component
formOne.addEventListener('thenja-login-form-submit', function(ev) {
  // data being passed from the web component can be found in ev.detail[0]
  console.log(ev.detail[0]);
});

// you could also set the attribute / property like so
formOne.title = "A different title";

// you can also pass data to the web component using a custom function
formOne.passData({email: 'email-passed-in@email.com'});
```

## Angular

_Version 6 was used._

1. Create your Angular application, create it with --style=scss if you want to override style values. Example ``ng new my-app --style=scss``

2. Install the dependencies ``npm install bootstrap --save`` and ``npm install git+https://github.com/nathan-andosen/example-vue-wc.git --save``

3. In Angular, you have to tell angular about custom web components, use the CUSTOM_ELEMENTS_SCHEMA for this (update the app.module.ts file).

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

4. Now in your main.ts file, lets import the Vue web component

```typescript
import "thenja-login-form";
```

5. Now lets import the style for this web component, in the styles.scss file add:

```scss
$color-primary: #ff4499;

// add in bootstrap and override the default blue color
$blue: $color-primary;
@import "~bootstrap/scss/bootstrap.scss";

// add in thenja-login-form web component
$tlf-color-primary: $color-primary;
@import "~thenja-login-form/dist/thenja-login-form.scss";
```

6. Now you can add the web component into your html, add it to the app.component.html for now:

```html
<thenja-login-form 
  [attr.title]="loginTitle" 
  id="form-one" 
  (thenja-login-form-submit)="loginSubmitHandler($event)">
</thenja-login-form>
```

In your app.component.ts file:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-with-vue-wc';
  loginTitle = 'Please login from Angular';
  loginSubmitHandler(ev) {
    console.log('Login form submit', ev.detail[0]);
  }
}
```

7. Done.