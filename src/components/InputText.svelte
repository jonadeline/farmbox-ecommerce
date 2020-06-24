<script>
  import Input from 'sveltestrap/src/Input.svelte';
  import { isEmpty } from '../helpers/helpers.js';

  export let id;
  export let value;
  export let name;
  export let type;
  export let placeholder;
  export let valid = true;
  export let validityMessage = '';
  export let required = false;
  let touched = false;

  function isValid(valid, touched, required, value) {
    if (valid && touched && required) {
      return true;
    } else if (valid && touched && !required && !isEmpty(value)) {
      return true;
    }
    return false;
  }
</script>

<style>

</style>

<div class="d-flex flex-column flex-grow-1">

  <Input {type} bind:value invalid={!valid && touched && required} valid={isValid(valid, touched, required, value)}
    {name} {id} {placeholder} on:blur={() => (touched = true)} />

  {#if validityMessage && !valid && touched && required}
    <p class="m-0 text-danger">{validityMessage}</p>
  {/if}
</div>