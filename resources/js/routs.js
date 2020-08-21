import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
let routes = [
    { path: '/dashboard', components: require('./components/Dashboard.vue') },
    { path: '/profile', components: require('./components/Profile.vue') },
    { path: '/users', components: require('./components/Users.vue') }
  ]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})


export default router;

