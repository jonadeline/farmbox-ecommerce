<script>
  import CartProductQty from './CartProductQty.svelte';
  import cart from '../stores/cart.js';

  export let id;
  export let name;
  export let price;
  export let image;
  export let qty;

  $: cart.changeQty(id, qty);
</script>

<style>
  .name {
    font-weight: 500;
  }
</style>

<div class="d-flex align-items-start">

  <picture class="rounded">
    <source width="100" srcset="products/{image}.webp" type="image/webp" />
    <source width="100" srcset="products/{image}.jpg" type="image/jpg" />
    <img width="100" class="img-fluid rounded" src="products/{image}.jpg" alt={name} />
  </picture>

  <div class="d-flex flex-column ml-4">
    <span class="name">{name.toUpperCase()}</span>
    <span class="price">
      <strong>{price}</strong>
      AED
    </span>
    <CartProductQty bind:qty />
  </div>
</div>