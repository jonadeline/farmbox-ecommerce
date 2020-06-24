<script>
  import FormGroup from 'sveltestrap/src/FormGroup.svelte';
  import Label from 'sveltestrap/src/Label.svelte';
  import Input from 'sveltestrap/src/Input.svelte';
  import InputGroup from 'sveltestrap/src/InputGroup.svelte';
  import InputGroupAddon from 'sveltestrap/src/InputGroupAddon.svelte';
  import InputGroupText from 'sveltestrap/src/InputGroupText.svelte';
  import Button from 'sveltestrap/src/Button.svelte';
  import Datepicker from 'svelte-calendar/src/Components/Datepicker.svelte';
  import InputText from './InputText.svelte';
  import { isEmpty, isEmail, isUAEPhoneNumber } from '../helpers/helpers.js';
  import isBefore from 'date-fns/isBefore';
  import startOfToday from 'date-fns/startOfToday';
  import getHours from 'date-fns/getHours';
  import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
  import isEqual from 'date-fns/isEqual';

  export let salesOrder;
  export let checkoutStep;

  let isFormValid = false;
  let email = '';
  let isEmailValid = false;
  let firstName = '';
  let isFirstNameValid = false;
  let lastName = '';
  let address = '';
  let isAddressValid = false;
  let address2 = '';
  let phone = '';
  let isPhoneValid = false;
  let emirate = 'dubai';
  let deliveryWindow = 'PM';
  let deliveryInstructions;
  let formattedDeliveryDate;
  let selectedDeliveryDate;
  let isDeliveryDateSelected;
  const dateFormat = '#{l}, #{F} #{j}, #{Y}';
  const startDateOfDeliveries = new Date(2019, 11, 10); // December 10th
  const endDate = new Date(2020, 11, 30);

  $: isEmailValid = !isEmpty(email) && isEmail(email);
  $: isFirstNameValid = !isEmpty(firstName);
  $: isAddressValid = !isEmpty(address);
  $: isPhoneValid = isUAEPhoneNumber(phone);
  $: isFormValid =
    isEmailValid &&
    isFirstNameValid &&
    isAddressValid &&
    isDeliveryDateSelected &&
    isPhoneValid;

  function handleEmirateChange(e) {
    emirate = e.currentTarget.value;
    isDeliveryDateSelected = false;
    selectedDeliveryDate = startOfToday();
  }

  function getStartDate() {
    const today = startOfToday();
    if (isBefore(today, startDateOfDeliveries)) {
      return startDateOfDeliveries;
    }
    return today;
  }

  function filterDeliveryDay(date) {
    const isJan1 = isEqual(date, new Date(2020, 0, 1));
    const isDec31 = isEqual(date, new Date(2019, 11, 31));
    const day = date.getDay();
    const diffWithToday = differenceInCalendarDays(date, new Date());
    const currentHour = getHours(new Date());
    if (currentHour > 15) {
      if (day !== 5 && diffWithToday > 2 && !isJan1 && !isDec31) return true;
    } else {
      if (day !== 5 && diffWithToday > 1 && !isJan1 && !isDec31) return true;
    }
  }

  function submitForm() {
    if (isFormValid) {
      salesOrder = {
        email,
        firstName,
        lastName,
        address,
        address2,
        emirate,
        deliveryInstructions,
        deliveryDate: selectedDeliveryDate,
        formattedDeliveryDate,
        deliveryWindow,
        phone: `+971${phone}`
      };
      checkoutStep = 2;
    }
  }
</script>

<style>
  .selectedDeliveryDate {
    font-size: 1.2rem;
  }

  .selectedDeliveryDate i {
    font-size: 1.6rem;
  }
</style>

<div class="pb-5">
  <form id="checkoutForm" on:submit|preventDefault={submitForm}>
    <Label class="label">Email</Label>
    <FormGroup>
      <InputText required={true} type="email" name="email" id="email" placeholder="name@domain.com" bind:value={email}
        valid={isEmailValid} validityMessage="Please enter a valid email address" />
    </FormGroup>

    <FormGroup>
      <div class="mb-2">
        <Label>Name</Label>
        <InputText required={true} type="text" name="firstName" id="firstName" placeholder="Your firstname"
          bind:value={firstName} valid={isFirstNameValid} validityMessage="Please enter your first name" />
      </div>
      <InputText type="text" name="lastName" id="lastName" placeholder="Your lastname" bind:value={lastName}
        validityMessage="Please enter your lastname" />
    </FormGroup>

    <FormGroup>
      <Label for="city">Address</Label>
      <div class="mb-2">
        <InputText type="text" name="address" id="address" placeholder="Address Line 1" bind:value={address}
          valid={isAddressValid} validityMessage="Please enter your address" />
      </div>

      <InputText type="text" name="address2" id="address2" placeholder="Apt, villa, etc (optional)"
        bind:value={address2} />
    </FormGroup>

    <FormGroup>
      <Label for="emirate">Emirate / City</Label>
      <Input bind:value={emirate} on:change={handleEmirateChange} required type="select" name="emirate" id="emirate">
      <option value="dubai">Dubai</option>
      <option value="abudhabi">Abu Dhabi</option>
      <option value="fujairah">Fujairah</option>
      <option value="sharjah">Sharjah</option>
      <option value="ajman">Ajman</option>
      <option value="rak">Ras Al Khaimah</option>
      <option value="uaq">Umm Al Quwain</option>
      <option value="alain">Al Ain</option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="deliveryInstructions">Phone</Label>
      <InputGroup>
        <div class="align-self-start">
          <InputGroupAddon addonType="append">
            <InputGroupText>+971</InputGroupText>
          </InputGroupAddon>
        </div>
        <InputText required={true} type="text" name="phone" id="phone" placeholder="512345678" valid={isPhoneValid}
          bind:value={phone} validityMessage="Please enter a valid UAE phone number" />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label>Delivery Date</Label>
      <br />
      {#if isDeliveryDateSelected}
        <strong class="selectedDeliveryDate d-flex align-items-center">
          <i class="uil uil-truck" />
          {formattedDeliveryDate}
        </strong>
      {/if}
      <Datepicker
        start={getStartDate()}
        end={endDate}
        format={dateFormat}
        bind:formattedSelected={formattedDeliveryDate}
        bind:dateChosen={isDeliveryDateSelected}
        bind:selected={selectedDeliveryDate}
        selectableCallback={filterDeliveryDay}>
        {#if !isDeliveryDateSelected}
          <Button>
            <span class="d-flex justify-content-center align-items-center">
              <i class="uil uil-calendar-alt" />
              Pick a delivery date
            </span>
          </Button>
        {:else}
          <Button class="reverse mt-3">
            <span class="d-flex justify-content-center align-items-center">
              <i class="uil uil-calendar-alt" />
              Change my delivery date
            </span>
          </Button>
        {/if}
      </Datepicker>
    </FormGroup>

    <Label>Delivery Time</Label>
    <FormGroup check>
      <Label check>
        <div class="d-flex justify-content-center align-items-center mr-4">
          <input
            class="mr-2"
            type="radio"
            value="AM"
            name="deliveryWindow"
            bind:group={deliveryWindow} />
          <span>AM</span>
        </div>
      </Label>
      <Label check>
        <div class="d-flex justify-content-center align-items-center mr-4">
          <input
            class="mr-2"
            type="radio"
            value="PM"
            name="deliveryWindow"
            bind:group={deliveryWindow} />
          <span>PM</span>
        </div>
      </Label>
      <Label check>
        <div class="d-flex justify-content-center align-items-center mr-4">
          <input
            class="mr-2"
            type="radio"
            value="Anytime"
            name="deliveryWindow"
            bind:group={deliveryWindow} />
          <span>Anytime</span>
        </div>
      </Label>
    </FormGroup>
    <br />
    <FormGroup>
      <Label for="deliveryInstructions">Delivery instructions</Label>
      <InputText
        type="textarea"
        name="deliveryInstructions"
        id="deliveryInstructions"
        placeholder="Any information useful for a smooth delivery (optional)"
        bind:value={deliveryInstructions} />
    </FormGroup>

    <div class="d-flex justify-content-center">
      <button
        class="btn flex-grow-1 d-flex justify-content-center align-items-center"
        type="submit"
        disabled={!isFormValid}>
        Proceed to payment
        <i class="uil uil-arrow-circle-right" />
      </button>
    </div>
  </form>

</div>