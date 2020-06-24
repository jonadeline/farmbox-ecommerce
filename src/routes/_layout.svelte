<script>
  import Container from 'sveltestrap/src/Container.svelte';
  import Col from 'sveltestrap/src/Col.svelte';
  import Row from 'sveltestrap/src/Row.svelte';
  import CartIcon from '../components/CartIcon.svelte';
  import globalStore from '../stores/globalStore.js';
</script>

<style>
  .cartIcon {
    right: 0;
    top: 10px;
    background: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  header {
    top: 0;
    z-index: 1040;
  }

  header .logo {
    width: 170px;
  }

  header .wrapper {
    height: 100px;
    background-size: contain;
    background-repeat: repeat-x;
  }

  .webp header .wrapper {
    background-image: url('../bg-header.webp');
  }

  .no-webp header .wrapper {
    background-image: url('../bg-header.png');
  }

  footer {
    background: #ececec;
    font-size: 0.7rem;
  }

  @media (min-width: 576px) {
    header .logo {
      width: 250px;
    }

    .cartIcon {
      right: 30px;
      width: 50px;
      height: 50px;
      top: 15px;
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9997;
  }
</style>

<header class="position-sticky">
  <div class="wrapper">
    <Container fluid>
      <Row>
        <Col xs="12">
        <div class="d-flex position-relative justify-content-center">
          {#if !$globalStore.isCheckout}
            <div class="cartIcon position-absolute">
              <CartIcon />
            </div>
            {/if}
          </div>
        </Col>
      </Row>
    </Container>
  </div>
</header>

<Container class="pb-5" fluid>
  <Row>
    <Col xs="12">
      <slot />
    </Col>
  </Row>
</Container>

<footer
  class="d-flex flex-column justify-content-center align-items-center py-2">
  <div class="d-flex justify-content-center mb-2">
  </div>
  <p class="m-0 text-center">
    © 2019 Svelte Store
  </p>
</footer>