import { Vue, Component, Prop } from "vue-property-decorator";

// the name of the component, this is also the name of the custom element that
// gets created
export const COMPONENT_NAME = 'thenja-login-form';


interface iData {
  email?: string;
  password?: string;
  rememberMe?: boolean;
}

@Component({
  name: COMPONENT_NAME
})
export default class ThenjaLoginFormComponent extends Vue {
  email: string = "";
  password: string = "";
  rememberMe: boolean = false;

  data!: iData;
  @Prop({default: 'Welcome!'}) title!: string;

  /**
   * Creates an instance of ExampleFormComponent.
   * 
   * @memberof ExampleFormComponent
   */
  constructor() {
    super();
    if(typeof this.data === 'string') {
      this.data = JSON.parse(this.data);
    }
    this.data = (this.data) ? this.data : {};
  }


  /**
   * Get the data as a json object
   *
   * @private
   * @returns {iData}
   * @memberof ExampleFormComponent
   */
  private getData(): iData {
    return JSON.parse(JSON.stringify(this.data));
  }


  /**
   * This function will be exposed onto the custom element
   *
   * @private
   * @param {iData} data
   * @memberof ExampleFormComponent
   */
  private passData(data: iData) {
    this.data = data;
  }


  /**
   * Submit the form
   *
   * @memberof ExampleFormComponent
   */
  submitForm() {
    this.$emit('thenja-login-form-submit', this.getData());
  }
}