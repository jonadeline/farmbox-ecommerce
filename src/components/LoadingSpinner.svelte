<script>
  export let message;
</script>

<style>
  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #13395e;
    background: -moz-linear-gradient(left,
        #13395e 10%,
        rgba(255, 128, 124, 0) 42%);
    background: -webkit-linear-gradient(left,
        #13395e 10%,
        rgba(255, 128, 124, 0) 42%);
    background: -o-linear-gradient(left,
        #13395e 10%,
        rgba(255, 128, 124, 0) 42%);
    background: -ms-linear-gradient(left,
        #13395e 10%,
        rgba(255, 128, 124, 0) 42%);
    background: linear-gradient(to right,
        #13395e 10%,
        rgba(255, 128, 124, 0) 42%);
    position: relative;
    -webkit-animation: load3 1s infinite linear;
    animation: load3 1s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .loader:before {
    width: 50%;
    height: 50%;
    background: #13395e;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }

  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>

<div class="d-flex flex-column justify-content-center align-items-center">
  <div class="loader">Loading...</div>
  <span>{message}</span>
</div>