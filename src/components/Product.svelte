<script>
  import Card from 'sveltestrap/src/Card.svelte';
  import CardBody from 'sveltestrap/src/CardBody.svelte';
  import Modal from 'svelte-simple-modal/src/Modal.svelte';
  import ProductTextLinkModal from './ProductTextLinkModal.svelte';
  import cart from '../stores/cart.js';
  import globalStore from '../stores/globalStore.js';

  export let product = {};

  function addToCart(product) {
    cart.addToCart(product);
    globalStore.toggleSidebar(true);
    firebase.analytics().logEvent('add_to_cart', {
      item_name: product.name,
      item_id: product.id,
      price: product.price,
      currency: 'AED'
    });
  }
</script>

<style>
  h2 {
    font-size: 1.2rem;
  }

  .price {
    color: #799a53;
    font-size: 1.4rem;
    border-bottom: 2px solid #799a53;
    padding: 0 5px;
  }

  .desc {
    font-size: 1.1rem;
  }
</style>

<Card class="border-0 bg-transparent mb-4">
  <CardBody class="px-0 py-0 d-flex flex-column justify-content-center">
    <picture class="rounded">
      <source srcset="products/{product.image}.webp" type="image/webp" />
      <source srcset="products/{product.image}.jpg" type="image/jpg" />
      <img class="img-fluid rounded" src="products/{product.image}.jpg" alt={product.name} />
    </picture>

    <h2 class="mb-0 mt-2 font-weight-bold">{product.name.toUpperCase()}</h2>
    <div class="d-flex my-3 justify-content-between align-items center">
      <p class="desc m-0">{product.short_desc}</p>
      <span class="price">
        <strong>{product.price}</strong>
        <small>AED</small>
      </span>
    </div>

    <button on:click="{ () => addToCart(product)}" type=" button"
      class="mt-2 btn d-flex align-items-center justify-content-center">
      <i class="uil uil-plus-circle" />
      <span>ADD TO CART</span>
    </button>

    <Modal>
      <ProductTextLinkModal description={product.description} name={product.name} />
    </Modal>
  </CardBody>
</Card>