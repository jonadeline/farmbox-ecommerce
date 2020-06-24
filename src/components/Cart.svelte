<script>
  import CartProduct from './CartProduct.svelte';
  import Button from 'sveltestrap/src/Button.svelte';
  import cart from '../stores/cart.js';
  import { getCartTotal } from '../helpers/helpers.js';
  import globalStore from '../stores/globalStore.js';
</script>

<style>
  hr {
    height: 1px;
    background: #ccc;
    width: 100%;
    border: 0;
  }

  .cartEmpty span:first-child {
    font-size: 3rem;
  }

  .total strong {
    color: #799a53;
  }
</style>

{#if $cart.length > 0}
  {#each $cart as product}
    <div class="mb-4">
      <CartProduct {...product} />
    </div>
  {/each}
  <hr />
  <div>
    <span>
      Shipping:
      <strong>Free</strong>
    </span>
    <br />
    <span class="total">
      Total :
      <strong>{getCartTotal($cart)}</strong>
      AED
    </span>
  </div>
  <br />
  <a
    class="d-block"
    on:click={() => globalStore.toggleSidebar(false)}
    rel="prefetch"
    href="/checkout">
    <Button class="w-100">
      <div class="d-flex justify-content-center align-items-center">
        CHECKOUT
        <i class="uil uil-arrow-circle-right" />
      </div>
    </Button>
  </a>
{/if}

{#if $cart.length === 0}
  <div class="cartEmpty text-center">
    <span class="d-block text-center">🤷</span>
    <span>Oops, you have nothing in your cart...</span>
  </div>
{/if}