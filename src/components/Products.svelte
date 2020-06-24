<script>
  import Col from 'sveltestrap/src/Col.svelte';
  import Product from './Product.svelte';
  import { products } from '../stores/products.js';
</script>

<style>

</style>

{#each $products as product}
  <Col xs="12" sm="6" md="6" xl="4" class="justify-content-center">
    <Product {product} />
  </Col>
{/each}