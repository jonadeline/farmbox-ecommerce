<script>
  import Row from 'sveltestrap/src/Row.svelte';
  import Col from 'sveltestrap/src/Col.svelte';
  import Container from 'sveltestrap/src/Container.svelte';
  import Products from '../components/Products.svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import globalStore from '../stores/globalStore.js';
  import { onMount } from 'svelte';

  onMount(() => {
    globalStore.toggleCheckout(false);
    firebase.analytics().logEvent('view_item_list', { item_category: 'all' });
  });
</script>

<style>
  h1 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  p {
    font-size: 1.1rem;
  }

  @media (min-width: 576px) {
    h1 {
      font-size: 1.7rem;
    }

    p {
      font-size: 1.3rem;
    }
  }

  @media (min-width: 720px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
</style>

<svelte:head>
  <title>Svelte | Store</title>
</svelte:head>

<!--  <Nav {segment} /> -->
<Container class="py-sm-4" fluid>
  <Row>
    <Col xs="12">
    <h1 class="m-0">Luxury Festive Cheese Platters</h1>
    <p class="pt-2">
      Don’t miss out - pre-order yours now!
    </p>
    </Col>
  </Row>
  <Row>
    <Products />
  </Row>
</Container>

{#if $globalStore.sidebar}
  <Sidebar />
{/if}