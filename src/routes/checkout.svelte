<script>
  import CheckoutForm from '../components/CheckoutForm.svelte';
  import PaymentForm from '../components/PaymentForm.svelte';
  import globalStore from '../stores/globalStore.js';
  import { onMount } from 'svelte';

  let checkoutStep = 1;
  let salesOrder;

  onMount(() => {
    globalStore.toggleCheckout(true);
    firebase.analytics().logEvent('begin_checkout');
  });

</script>

<style>
  ul {
    margin: 0;
    padding: 0;
    font-size: 0.9rem;
  }

  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li.step {
    width: 60px;
  }

  li i {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #13395e;
  }

  .current {
    background: #13395e;
  }

  li.joining-line {
    width: 50px;
    background: #13395e;
    height: 1px;
    top: 7px;
    position: relative;
  }

  .mx-auto {
    max-width: 700px;
  }
</style>

<svelte:head>
  <title>Farmbox | Christmas</title>
</svelte:head>

<div class="mx-auto py-4">
  <nav class="mb-4">
    <ul class="d-flex justify-content-center">
      <li class="d-flex flex-column align-items-center step">
        <i class="current" />
        <span class="pt-1">CART</span>
      </li>
      <li class="joining-line" />
      <li class="d-flex flex-column align-items-center step">
        <i class:current={checkoutStep>= 1} class="current" />
          <span class="pt-1">CHECKOUT</span>
      </li>
      <li class="joining-line" />
      <li class="d-flex flex-column align-items-center step">
        <i class:current={checkoutStep===2} />
        <span class="pt-1">PAYMENT</span>
      </li>
    </ul>
  </nav>

  {#if checkoutStep === 1}
    <CheckoutForm bind:salesOrder bind:checkoutStep />
  {/if}

  {#if checkoutStep === 2}
    <PaymentForm {...salesOrder} />
  {/if}
</div>