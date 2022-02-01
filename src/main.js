import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import store from '../src/store';
import firebase from 'firebase'
import App from './App.vue';
import router from './router';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');

firebase.initializeApp({
  apiKey: "AIzaSyBdSa99D2fFBwrZ21KLidzh4zCXxLhj6sQ",
  authDomain: "test-f2583.firebaseapp.com",
  databaseURL: "https://test-f2583.firebaseio.com",
  projectId: "test-f2583",
  storageBucket: "test-f2583.appspot.com",
  messagingSenderId: "735857344660",
  appId: "1:735857344660:web:b385da2123fbcaaa9ff481"
})
