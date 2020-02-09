window.addEventListener('load', e => {    
    registerSW();
  });

  async function registerSW() { 
    if ('serviceWorker' in navigator) { (2)
      try {
        await navigator.serviceWorker.register('./sw.js'); 
      } catch (e) {
        alert('ServiceWorker registration failed. Sorry about that.'); 
      }
    } else {
      document.querySelector('.alert').removeAttribute('hidden'); 
    }
  }
  async function registerSW() { 
    if ('serviceWorker' in navigator) { (2)
      try {
        await navigator.serviceWorker.register('./sw.js'); 
      } catch (e) {
        alert('ServiceWorker registration failed. Sorry about that.'); 
      }
    } else {
      document.querySelector('.alert').removeAttribute('hidden'); 
    }
  }
