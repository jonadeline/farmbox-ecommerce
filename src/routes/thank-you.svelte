<script>
  import Button from 'sveltestrap/src/Button.svelte';
  fbq('track', 'Purchase');
</script>

<style>
  .uil {
    font-size: 8rem;
  }
</style>

<div class="d-flex flex-column align-items-center justify-content-center pt-5">
  <i class="uil uil-check-circle" />
  <h1 class="font-weight-bold">THANK YOU!</h1>
  <p class="text-center">
    Your order is confirmed.
    <br />
    You will receive an email shortly with the details of your order.
  </p>

  <a href="https://farmbox.ae">
    <Button class="p-2">Visit farmbox.ae</Button>
  </a>
</div>