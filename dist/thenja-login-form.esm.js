import Vue from 'vue';
import VueCustomElement from 'vue-custom-element';
import 'jquery/dist/jquery.slim.js';
import 'popper.js';
import 'bootstrap';

// Polyfill for Object.values
var valuesPolyfill = function (obj) {
    var res = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i))
            res.push(obj[i]);
    }
    return res;
};
if (!Object.values)
    Object.values = valuesPolyfill;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var vueClassComponent_common = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue$$1 = _interopDefault(Vue);

var hasProto = { __proto__: [] } instanceof Array;
function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function mixins() {
    var Ctors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Ctors[_i] = arguments[_i];
    }
    return Vue$$1.extend({ mixins: Ctors });
}
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== "object" && type !== "function");
}

function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { return vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured' // 2.5
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            // methods
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue$$1
        ? superProto.constructor
        : Vue$$1;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    return Extended;
}
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        // `prototype` should not be overwritten
        if (key === 'prototype') {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value)
                && superDescriptor
                && superDescriptor.value === descriptor.value) {
                return;
            }
        }
        Object.defineProperty(Extended, key, descriptor);
    });
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
(function (Component) {
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }
    Component.registerHooks = registerHooks;
})(Component || (Component = {}));
var Component$1 = Component;

exports.default = Component$1;
exports.createDecorator = createDecorator;
exports.mixins = mixins;
});

var Component = unwrapExports(vueClassComponent_common);
var vueClassComponent_common_1 = vueClassComponent_common.createDecorator;
var vueClassComponent_common_2 = vueClassComponent_common.mixins;

/** vue-property-decorator verson 7.0.0 MIT LICENSE copyright 2018 kaorun343 */
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return vueClassComponent_common_1(function (componentOptions, k) {
        (componentOptions.props || (componentOptions.props = {}))[k] = options;
    });
}

/**
 * Register a VueJs component as a custom element
 *
 * @export
 * @class RegisterComponentService
 */
var RegisterComponentService = /** @class */ (function () {
    function RegisterComponentService() {
    }
    /**
     * Register the custom element component
     *
     * @param {*} component
     * @param {string} name
     * @param {(element: Function) => void} [cb]
     * @memberof LoadComponentService
     */
    RegisterComponentService.prototype.register = function (component, name, cb) {
        this.loadPolyfill(function () {
            var element;
            var comp = new component['components'][name]();
            element = Vue.customElement(name, comp.$options);
            if (cb)
                cb(element);
        });
    };
    /**
     * Load the polyfill for custom elements if needed
     *
     * @private
     * @param {() => void} cb
     * @memberof LoadComponent
     */
    RegisterComponentService.prototype.loadPolyfill = function (cb) {
        if (!window.customElements || !window.customElements.define
            || !window.customElements.get || !window.customElements.whenDefined) {
            if (window.documentRegisterElementScriptPath) {
                // customElements not natively supported, have to download the polyfill
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", window.documentRegisterElementScriptPath);
                fileref.onload = function () {
                    cb();
                };
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
            else {
                throw new Error('customElements is not supported, please use the ' +
                    'document-register-element polyfill');
            }
        }
        else {
            cb();
        }
    };
    return RegisterComponentService;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

// the name of the component, this is also the name of the custom element that
// gets created
var COMPONENT_NAME = 'thenja-login-form';
var ThenjaLoginFormComponent = /** @class */ (function (_super) {
    __extends(ThenjaLoginFormComponent, _super);
    /**
     * Creates an instance of ExampleFormComponent.
     *
     * @memberof ExampleFormComponent
     */
    function ThenjaLoginFormComponent() {
        var _this = _super.call(this) || this;
        _this.email = "";
        _this.password = "";
        _this.rememberMe = false;
        if (typeof _this.data === 'string') {
            _this.data = JSON.parse(_this.data);
        }
        _this.data = (_this.data) ? _this.data : {};
        return _this;
    }
    /**
     * Get the data as a json object
     *
     * @private
     * @returns {iData}
     * @memberof ExampleFormComponent
     */
    ThenjaLoginFormComponent.prototype.getData = function () {
        return JSON.parse(JSON.stringify(this.data));
    };
    /**
     * This function will be exposed onto the custom element
     *
     * @private
     * @param {iData} data
     * @memberof ExampleFormComponent
     */
    ThenjaLoginFormComponent.prototype.passData = function (data) {
        this.data = data;
    };
    /**
     * Submit the form
     *
     * @memberof ExampleFormComponent
     */
    ThenjaLoginFormComponent.prototype.submitForm = function () {
        this.$emit('thenja-login-form-submit', this.getData());
    };
    __decorate([
        Prop({ default: 'Welcome!' })
    ], ThenjaLoginFormComponent.prototype, "title", void 0);
    ThenjaLoginFormComponent = __decorate([
        Component({
            name: COMPONENT_NAME
        })
    ], ThenjaLoginFormComponent);
    return ThenjaLoginFormComponent;
}(Vue));

/* script */
            const __vue_script__ = ThenjaLoginFormComponent;
            
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "thenja-login-form" }, [
    _c("div", { staticClass: "logo" }),
    _vm._v(" "),
    _c("h2", { staticClass: "title" }, [_vm._v(_vm._s(_vm.title))]),
    _vm._v(" "),
    _c("div", [
      _c("div", { staticClass: "form-group" }, [
        _c("label", { attrs: { for: "exampleInputEmail1" } }, [
          _vm._v("Email address")
        ]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.data.email,
              expression: "data.email"
            }
          ],
          staticClass: "form-control",
          attrs: {
            type: "email",
            id: "exampleInputEmail1",
            "aria-describedby": "emailHelp",
            placeholder: "Enter email"
          },
          domProps: { value: _vm.data.email },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.data, "email", $event.target.value);
            }
          }
        }),
        _vm._v(" "),
        _c(
          "small",
          { staticClass: "form-text text-muted", attrs: { id: "emailHelp" } },
          [_vm._v("We'll never share your email with anyone else.")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c("label", { attrs: { for: "exampleInputPassword1" } }, [
          _vm._v("Password")
        ]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.data.password,
              expression: "data.password"
            }
          ],
          staticClass: "form-control",
          attrs: {
            type: "password",
            id: "exampleInputPassword1",
            placeholder: "Password"
          },
          domProps: { value: _vm.data.password },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.data, "password", $event.target.value);
            }
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c("div", { staticClass: "form-check" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.data.rememberMe,
                expression: "data.rememberMe"
              }
            ],
            staticClass: "form-check-input",
            attrs: { type: "checkbox", id: "exampleCheck1" },
            domProps: {
              checked: Array.isArray(_vm.data.rememberMe)
                ? _vm._i(_vm.data.rememberMe, null) > -1
                : _vm.data.rememberMe
            },
            on: {
              change: function($event) {
                var $$a = _vm.data.rememberMe,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false;
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v);
                  if ($$el.checked) {
                    $$i < 0 &&
                      _vm.$set(_vm.data, "rememberMe", $$a.concat([$$v]));
                  } else {
                    $$i > -1 &&
                      _vm.$set(
                        _vm.data,
                        "rememberMe",
                        $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                      );
                  }
                } else {
                  _vm.$set(_vm.data, "rememberMe", $$c);
                }
              }
            }
          }),
          _vm._v(" "),
          _c(
            "label",
            {
              staticClass: "form-check-label",
              attrs: { for: "exampleCheck1" }
            },
            [_vm._v("Remember me")]
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "btn btn-primary", on: { click: _vm.submitForm } },
        [_vm._v("Submit")]
      )
    ]),
    _vm._v(" "),
    _vm._m(0)
  ])
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "phone-num" }, [
      _c("span", { staticClass: "icomoon-phone" }),
      _vm._v("\n    1800 000 1112\n  ")
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "/Users/nathananderson/Sites/repos/example-vue-wc/src/thenja-login-form.component.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ThenjaLoginFormComponent$1 = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

Vue.use(VueCustomElement);
var component = ThenjaLoginFormComponent$1;
// register our component
var registerComponentSrv = new RegisterComponentService();
registerComponentSrv.register(component, COMPONENT_NAME, function (element) {
    // create your own custom methods on the custum element
    element.prototype.passData = function (data) {
        this.getVueInstance().passData(data);
    };
});
