<script>
  import { onMount } from 'svelte';
  import cart from '../stores/cart.js';
  import { getRandomId, getCartTotal } from '../helpers/helpers.js';
  import * as sapper from '@sapper/app';
  import LoadingSpinner from './LoadingSpinner.svelte';

  export let firstName;
  export let lastName;
  export let address;
  export let address2;
  export let emirate;
  export let email;
  export let deliveryInstructions;
  export let deliveryDate;
  export let formattedDeliveryDate;
  export let deliveryWindow;
  export let phone;

  let disablePaymentBtn = true;
  let isLoading = false;

  const frameStyles = {
    base: {
      fontSize: '18px'
    },
    placeholder: {
      base: {
        color: '#636c72'
      }
    },
    invalid: {
      color: '#dc3545'
    }
  };

  $: cartTotal = getCartTotal($cart);

  onMount(() => {
    firebase.analytics().logEvent('add_payment_info');
    Frames.init({
      publicKey: 'pk_9c2f92a4-1cb3-471e-b59f-69adb74a3858',
      style: frameStyles
    });

    Frames.addEventHandler(Frames.Events.CARD_VALIDATION_CHANGED, event => {
      console.log('CARD_VALIDATION_CHANGED: %o', event);
      disablePaymentBtn = !Frames.isCardValid();
    });

    Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, event => {
      isLoading = true;
      const id = `xmas2019${getRandomId()}`;
      proceedPayment(event.token, id)
        .then(() => saveSalesOrder(id))
        .then(() => sendConfirmationEmail(id))
        .then(() => {
          firebase.analytics().logEvent('purchase', {
            currency: 'AED',
            value: cartTotal,
            transaction_id: id
          });
          cart.emptyCart();
          sapper.goto('/thank-you');
        })
        .catch(error => {
          console.log(error);
          sapper.goto('/failed');
        });
    });

    Frames.addEventHandler(
      Frames.Events.FRAME_VALIDATION_CHANGED,
      onValidationChanged
    );

    Frames.addEventHandler(
      Frames.Events.CARD_TOKENIZATION_FAILED,
      onCardTokenizationFailed
    );

    Frames.addEventHandler(
      Frames.Events.PAYMENT_METHOD_CHANGED,
      paymentMethodChanged
    );
  });

  function onCardTokenizationFailed(error) {
    console.log('CARD_TOKENIZATION_FAILED: %o', error);
    Frames.enableSubmitForm();
  }
  function generateLogos() {
    const logos = {};
    logos['card-number'] = {
      src: 'card',
      alt: 'card number logo'
    };
    logos['expiry-date'] = {
      src: 'exp-date',
      alt: 'expiry date logo'
    };
    logos.cvv = {
      src: 'cvv',
      alt: 'cvv logo'
    };
    return logos;
  }

  function onValidationChanged(event) {
    const e = event.element;

    if (event.isValid || event.isEmpty) {
      if (e === 'card-number' && !event.isEmpty) {
        showPaymentMethodIcon();
      }
      setDefaultIcon(e);
      clearErrorIcon(e);
      clearErrorMessage(e);
    } else {
      if (e === 'card-number') {
        clearPaymentMethodIcon();
      }
      setDefaultErrorIcon(e);
      setErrorIcon(e);
      setErrorMessage(e);
    }
  }

  function setErrorMessage(el) {
    const selector = '.error-message__' + el;
    const message = document.querySelector(selector);
    message.textContent = errors[el];
  }

  function setDefaultIcon(el) {
    const selector = 'icon-' + el;
    const logo = document.getElementById(selector);
    logo.setAttribute('src', 'card-icons/' + logos[el].src + '.svg');
    logo.setAttribute('alt', logos[el].alt);
  }

  function clearErrorMessage(el) {
    const selector = '.error-message__' + el;
    const message = document.querySelector(selector);
    message.textContent = '';
  }

  function clearErrorIcon(el) {
    const logo = document.getElementById('icon-' + el + '-error');
    logo.style.removeProperty('display');
  }

  function showPaymentMethodIcon(parent, pm) {
    if (parent) parent.classList.add('show');

    const logo = document.getElementById('logo-payment-method');
    if (pm) {
      const name = pm.toLowerCase();
      logo.setAttribute('src', 'card-icons/' + name + '.svg');
      logo.setAttribute('alt', pm || 'payment method');
    }
    logo.style.removeProperty('display');
  }

  function clearPaymentMethodIcon(parent) {
    if (parent) parent.classList.remove('show');
    const logo = document.getElementById('logo-payment-method');
    logo.style.setProperty('display', 'none');
  }

  function setDefaultErrorIcon(el) {
    const selector = 'icon-' + el;
    const logo = document.getElementById(selector);
    logo.setAttribute('src', 'card-icons/' + logos[el].src + '-error.svg');
    logo.setAttribute('alt', logos[el].alt);
  }

  function setErrorIcon(el) {
    const logo = document.getElementById('icon-' + el + '-error');
    logo.style.setProperty('display', 'block');
  }

  function paymentMethodChanged(event) {
    const pm = event.paymentMethod;
    const container = document.querySelector('.icon-container.payment-method');

    if (!pm) {
      clearPaymentMethodIcon(container);
    } else {
      clearErrorIcon('card-number');
      showPaymentMethodIcon(container, pm);
    }
  }

  function submitForm() {
    Frames.submitCard();
  }

  async function saveSalesOrder(id) {
    const items = [];

    $cart.forEach(item => {
      items.push(`${item.id} x${item.qty}`);
    });

    const salesOrder = {
      id,
      email,
      amount: cartTotal,
      firstName,
      lastName,
      address,
      address2,
      emirate,
      deliveryInstructions,
      deliveryDate,
      deliveryWindow,
      phone,
      items
    };

    return fetch(
      'https://us-central1-christmas-offer-96423.cloudfunctions.net/saveSalesOrder',
      {
        method: 'POST',
        body: JSON.stringify(salesOrder),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        Promise.resolve(res);
      })
      .catch(error => Promise.reject(error));
  }

  async function proceedPayment(cardToken, id) {
    const paymentInfo = {
      token: cardToken,
      amount: cartTotal,
      id,
      email,
      firstName,
      lastName
    };

    return fetch(
      'https://us-central1-christmas-offer-96423.cloudfunctions.net/chargeWithCard',
      {
        method: 'POST',
        body: JSON.stringify(paymentInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(async res => {
        const checkoutResponse = await res.json();
        // console.log(checkoutResponse)
        if (checkoutResponse.response_code !== '10000') {
          throw new Error(
            `${checkoutResponse.response_code} - ${checkoutResponse.response_summary}`
          );
        }
        Promise.resolve(res);
      })
      .catch(error => Promise.reject(error));
  }

  async function sendConfirmationEmail(id) {
    const emailData = {
      id,
      email,
      amount: cartTotal,
      firstName,
      lastName,
      address,
      address2,
      emirate,
      deliveryDate: formattedDeliveryDate,
      products: $cart,
      phone
    };

    return fetch(
      'https://us-central1-christmas-offer-96423.cloudfunctions.net/sendConfirmationEmail',
      {
        method: 'POST',
        body: JSON.stringify(emailData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        Promise.resolve(res);
      })
      .catch(error => Promise.reject(error));
  }

  const logos = generateLogos();
  const errors = {};
  errors['card-number'] = 'Please enter a valid card number';
  errors['expiry-date'] = 'Please enter a valid expiry date';
  errors.cvv = 'Please enter a valid cvv code';
</script>

<style>

</style>

{#if !isLoading}
  <form id="payment-form" on:submit|preventDefault={submitForm}>
    <label for="card-number">Card number</label>
    <div class="d-flex flex-column">
      <div class="input-container rounded bg-white card-number">
        <div class="icon-container">
          <img id="icon-card-number" src="card-icons/card.svg" alt="PAN" />
        </div>
        <div class="card-number-frame w-100" />
        <div class="icon-container payment-method">
          <img alt="Card type" id="logo-payment-method" />
        </div>
        <div class="icon-container">
          <img
            alt="Your card number is invalid"
            id="icon-card-number-error"
            src="card-icons/error.svg" />
        </div>
      </div>
      <span class="error-message text-danger error-message__card-number" />
    </div>

    <div class="date-and-code d-flex mt-3">
      <div class="d-flex flex-column">
        <label for="expiry-date">Expiry date</label>
        <div class="input-container bg-white rounded expiry-date mr-4">
          <div class="icon-container">
            <img
              id="icon-expiry-date"
              src="card-icons/exp-date.svg"
              alt="Expiry date" />
          </div>
          <div class="expiry-date-frame" />
          <div class="icon-container">
            <img
              alt="error"
              id="icon-expiry-date-error"
              src="card-icons/error.svg" />
          </div>
        </div>
        <span class="error-message text-danger error-message__expiry-date" />
      </div>

      <div class="d-flex flex-column">
        <label for="cvv">Security code</label>
        <div class="input-container bg-white rounded cvv">
          <div class="icon-container">
            <img id="icon-cvv" src="card-icons/cvv.svg" alt="CVV" />
          </div>
          <div class="cvv-frame" />
          <div class="icon-container">
            <img alt="error" id="icon-cvv-error" src="card-icons/error.svg" />
          </div>
        </div>
        <span class="error-message text-danger error-message__cvv" />

      </div>
    </div>

    <button
      class="btn mt-4 flex-grow-1 d-flex justify-content-center
      align-items-center"
      class:py-2={disablePaymentBtn}
      id="pay-button"
      disabled={disablePaymentBtn}>
      PAY {cartTotal} AED
      <i
        class="uil uil-check-circle d-none"
        class:d-inline-block={!disablePaymentBtn} />
    </button>
    <div />

    <p class="success-payment-message" />

  </form>
{/if}

{#if isLoading}
  <LoadingSpinner message="Your payment is being processed, please wait..." />
{/if}