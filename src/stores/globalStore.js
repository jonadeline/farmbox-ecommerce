
import { writable } from 'svelte/store';

const globalStore = writable({
  sidebar: false,
  isCheckout: false
});

const store = {
  subscribe: globalStore.subscribe,
  toggleSidebar: (value) => {
    globalStore.update(storeValues => {
      return { ...storeValues, sidebar: value };
    });
  },
  toggleCheckout: (value) => {
    globalStore.update(storeValues => {
      return { ...storeValues, isCheckout: value };
    });
  }
};

export default store;
