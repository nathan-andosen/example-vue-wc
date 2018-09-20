import "./polyfills/polyfills";
import { Vue } from "vue-property-decorator";
import VueCustomElement from 'vue-custom-element';
import { RegisterComponentService } from './services/register-component.service';
Vue.use(VueCustomElement);

import "./assets/scss/index.scss";
// bootstrap dependency
import "jquery/dist/jquery.slim.js";
import "popper.js";
import "bootstrap";

import ThenjaLoginFormComponent from './thenja-login-form.component.vue';
import { COMPONENT_NAME } from './thenja-login-form.component';
const component: any = ThenjaLoginFormComponent;

// register our component
const registerComponentSrv = new RegisterComponentService();
registerComponentSrv.register(component, COMPONENT_NAME, (element) => {
  // create your own custom methods on the custum element
  element.prototype.passData = function(data) {
    this.getVueInstance().passData(data);
  };
});