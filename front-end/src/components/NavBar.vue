<template>
    <div class="nav-bar">
      <router-link to="/products" class="products-link">
        <div class="logo-wrap">
          <img :src="logo" />
        </div>
      </router-link>
      <div class="nav-buttons-wrap" style="float: right;">
        <router-link to="/cart">
          <button>Shopping Cart</button>
        </router-link>
      </div>
  
    </div>
  </template>
  
  <script>
  import { getAuth, signOut } from 'firebase/auth';
  import logo from '@/assets/logo-hexagon.svg';
  
  export default {
    name: "NavBar",
    props: ['user'],
    data() {
      return {
        logo,
      }
    },
    methods: {
        // <button @click="signOut" v-if="user">Sign Out</button>
        signOut() {
            const auth = getAuth();
            signOut(auth);
        }
    }
  }
  </script>