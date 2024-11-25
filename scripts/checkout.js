import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import '../data/cart-class.js';
import { loadProducts,loadProductsFetch,products } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';
//import '../data/car.js';

Promise.all([
  
  loadProductsFetch(),

  new Promise((resolve)=>{
     loadCart(()=>{
     resolve();
    })
  })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

/*
new Promise((resolve)=>{
   loadProducts(()=>{
     resolve();
   })

}).then(()=>{
    return new Promise((resolve)=>{
      loadCart(()=>{
      resolve();
      })
    })

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/
    

/*
loadProducts(()=>{
  loadCart(()=>{
      renderOrderSummary();
      renderPaymentSummary();
  })
})
  */

//  renderOrderSummary();
//  renderPaymentSummary(); 
  

  
