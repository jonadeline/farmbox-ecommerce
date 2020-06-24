<script>
  export let description;
</script>

<div class="pt-3">
  {#each description as cheese}
    {cheese}
    <br />
  {/each}
  <strong>Wooden serving platter</strong>
</div>