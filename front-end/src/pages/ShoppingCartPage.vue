<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingCartList :products="cartItems" @remove-from-cart="removeFromCart($event)" />
        <button class="checkout-button">Proceede to Checkout</button>
    </div>
    <div v-else>
        <p>Your cart is empty.</p>
    </div>
</template>

<script>
import axios from 'axios';
import ShoppingCartList from '@/components/ShoppingCartList.vue';

export default {
    name: "ShoppingCartPage",
    components: {
        ShoppingCartList
    },
    data() {
        return {
            cartItems: []
        }
    },
    async created() {
        const response = await axios.get('/api/users/1234/cart');
        const cartItems = response.data;
        this.cartItems = cartItems;
    },
    methods: {
        async removeFromCart(productId) {
            const response = await axios.delete(`/api/users/1234/cart/${productId}`);
            const updatedCart = response.data;
            this.cartItems = updatedCart;
        }
    }
}
</script>