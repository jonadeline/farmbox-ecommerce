<script>
  import { getContext } from 'svelte';
  import ProductDescription from './ProductDescription.svelte';

  export let description;
  export let name;

  const { open } = getContext('simple-modal');

  const showDescription = () => {
    open(ProductDescription, { description, name });
  };
</script>

<style>
  i {
    font-size: 1.5rem;
  }

  span {
    color: #315319;
    cursor: pointer;
  }
</style>

<span class="d-flex align-items-center py-2 justify-content-center" on:click={showDescription}>
  <i class="uil uil-info-circle" />
  See platter content
</span>