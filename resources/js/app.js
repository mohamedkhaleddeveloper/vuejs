/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform';
import Gate from './Gate';
Vue.prototype.$gate = new Gate(window.user);
import moment from 'moment';
// const swal = require('sweetalert2')

import swal from 'sweetalert2';
window.swal = swal;

const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});
window.Toast = Toast;


window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component('pagination', require('laravel-vue-pagination'));
Vue.filter('myDate',function(created){
  return moment(created).format("MMM Do YY");  
});

window.fire = new Vue;
import router from "./routs";

import VueProgressBar from 'vue-progressbar';

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
  speed: '0.2s',
  opacity: '0.6s',
  termination: 300
},
  autoRevert: true,
  location: 'left',
  inverse: false
}
Vue.use(VueProgressBar, options);
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
  'not-found',
  require('./components/notFound.vue').default
);


Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('test-component', require('./components/test/testpp.vue'),{name:'testpp'});
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const app = new Vue({
    el: '#app',
    router,
    data:{
      search: ''  
    },
    methods:{
      // searchit(){
      //   console.log('here');
      // }
      searchit:_.debounce(()=>{
        fire.$emit('searching');
      },1000),

      printme() {
        window.print();
      }
    }
});