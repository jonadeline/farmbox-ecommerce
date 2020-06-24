<script>
  import cart from '../stores/cart.js';
  import globalStore from '../stores/globalStore.js';
  let itemsInCart = 0;

  $: {
    itemsInCart = 0;
    $cart.forEach(item => {
      itemsInCart += item.qty;
    });
  }
</script>

<style>
  div {
    cursor: pointer;
    top: -5px;
    left: -3px;
  }

  i {
    font-size: 2rem;
  }

  span {
    top: 19px;
    left: 19px;
    font-size: 0.8rem;
  }

  @media (min-width: 576px) {
    i {
      font-size: 2.5rem;
    }

    span {
      top: 26px;
      left: 23px;
      font-size: 0.9rem;
    }
  }
</style>

<div on:click={() => globalStore.toggleSidebar(true)} class="position-relative">
  <i class="uil uil-cart" />
  <span class="position-absolute font-weight-bold">{itemsInCart}</span>
</div>
