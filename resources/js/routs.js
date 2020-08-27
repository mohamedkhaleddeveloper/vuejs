import Vue from 'vue';
import VueRouter from 'vue-router';;
Vue.use(VueRouter)


// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
let routes = [
    { path: '/dashboard', components: require('./components/Dashboard.vue') },
    { path: '/developer', components: require('./components/Developer.vue') },
    { path: '/profile', components: require('./components/Profile.vue') },
    { path: '/users', components: require('./components/Users.vue') },
    { path: '*', components: require('./components/notFound.vue') }
  ]
window.moment = require('moment');
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

Vue.filter('upText', function(text){
  return text[0].toUpperCase() + text.slice(1)
})
Vue.filter('myDate',function(created){
    return created.moment().format("MMM Do YY");  
})

export default router;

