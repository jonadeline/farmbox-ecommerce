<script>
  import globalStore from '../stores/globalStore.js';
  import { fly, fade } from 'svelte/transition';
  import Cart from './Cart.svelte';
</script>

<style>
  .sidebar-container {
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    width: 85vw;
    height: 100%;
    z-index: 9999;
  }

  @media (min-width: 768px) {
    .sidebar-container {
      width: 50vw;
    }
  }

  @media (min-width: 992px) {
    .sidebar-container {
      width: 35vw;
    }
  }

  @media (min-width: 1200px) {
    .sidebar-container {
      width: 30vw;
    }
  }

  .sidebar {
    width: 100%;
    margin: 0 auto;
  }

  .sidebar-overlay {
    position: fixed;
    z-index: 9998;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.66);
  }

  .uil-arrow-left {
    font-size: 1.5rem;
    position: relative;
  }

  .back {
    color: #799a53;
    cursor: pointer;
    position: relative;
    left: -10px;
  }
</style>

<div class="sidebar-container" transition:fly={{ x: 2000 }}>
  <div class="sidebar py-2 px-4 d-flex flex-column" transition:fade={{ delay: 400 }}>
    <!-- header -->
    <div class="sidebar-header mb-4">
      <div class="back d-flex align-items-center" on:click={() => {
        globalStore.toggleSidebar(false);
        }}>
        <i class="uil uil-arrow-left" />
        <span>Continue shopping</span>
      </div>
    </div>
    <Cart />
  </div>

</div>

{#if $globalStore.sidebar}
  <div
    class="sidebar-overlay"
    on:click={() => globalStore.toggleSidebar(false)} />
{/if}