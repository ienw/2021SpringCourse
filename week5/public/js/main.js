'use strict';

window.addEventListener('load', async() => {
  if ('serviceWorker' in navigator) {
    try{
      const worker = await navigator.serviceWorker.register('./sw.js')
    } catch(e) {
      console.log(e.message);
    }
  }
});