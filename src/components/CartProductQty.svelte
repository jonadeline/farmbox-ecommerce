<script>
  export let qty;

  let disabled = true;

  const addUnit = () => {
    qty += 1;
  };

  const removeUnit = () => {
    if (qty > 1) qty += -1;
  };

  const removeItem = () => {
    qty = 0;
  };

  $: if (qty > 1) {
    disabled = false;
  } else {
    disabled = true;
  }
</script>

<style>
  i {
    font-size: 2rem;
    cursor: pointer;
    color: #315319;
  }

  div {
    position: relative;
    left: -8px;
    top: -5px;
  }

  .disabled {
    color: #ccc;
  }

  span {
    cursor: pointer;
    position: relative;
    top: -5px;
  }
</style>

<div class="d-flex justy-content-center align-items-center">
  <i on:click={addUnit} class="uil uil-plus-square" />
  {qty}
  <i on:click={removeUnit} class="uil uil-minus-square" class:disabled />
  <br />

</div>
<span class="text-danger" on:click={removeItem}>Remove</span>