<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" />
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button v-if="user && !itemIsInCart" class="add-to-cart" @click="addToCart">Add to cart</button>
            <button v-if="user && itemIsInCart" class="grey-button add-to-cart">Item is in cart</button>
            <button v-if="!user" class="sign-in" @click="signIn">Sign in to add to cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
//import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import axios from 'axios';
import NotFoundPage from './NotFoundPage.vue';

export default {
    name: "ProductDetailPage",
    props: ['user'],
    components: {
        NotFoundPage
    },
    data() {
        return {
            product: {},
            cartItems: []
        }
    },
    computed: {
        itemIsInCart() {
            return this.cartItems.some((product) => product.id == this.$route.params.productId);
        }
    },
    async created() {
        /*
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, window.location.href)) {
            const email = window.localStorage.getItem('emailForSignIn');
            await signInWithEmailLink(auth, email, window.location.href);
            alert("sucessfully signed in!");
            window.localStorage.removeItem('emailForSignIn');
        }
        */
        
        const response = await axios.get(`/api/products/${this.$route.params.productId}`);
        const product = response.data;
        this.product = product;

        const cartResponse = await axios.get('/api/users/1234/cart');
        const cartItems = cartResponse.data;
        this.cartItems = cartItems;
    },
    methods: {
        async addToCart() {
            await axios.post('/api/users/1234/cart', {
                id: this.$route.params.productId
            });
            alert('Succesfully added item to cart');

            const cartResponse = await axios.get('/api/users/1234/cart');
            const cartItems = cartResponse.data;
            this.cartItems = cartItems;
        },
        async signIn() {
            /*
            const email = prompt("Fill in the email to singn in");
            const auth = getAuth();
            const actionCodeSettings = {
                url: `http://localhost:8080/products/${this.$route.params.productId}`,
                handleCodeInApp: true
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            alert('Check your email');
            window.localStorage.setItem('emailForSignIn', email);
            */
        }
    }
}
</script>