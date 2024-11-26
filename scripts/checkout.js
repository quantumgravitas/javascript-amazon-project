import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import '../data/cart-class.js';
import { loadProducts,loadProductsFetch,products } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';
//import '../data/car.js';

 /*async function loadPage()
{
  await loadProductsFetch();

  new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      })
   }).then(()=>{
       renderOrderSummary();
       renderPaymentSummary();
   })
}*/

 async function loadPage()
 {
    await loadProductsFetch();

    await new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      })
    });
    
    renderOrderSummary();
    renderPaymentSummary();
 }
 
loadPage();
    


// function loadPage()
// {
//   return new Promise((resolve)=>{
//     console.log('load page');
//     resolve();
//   })
// } it is similar to async function loadPage.async function is just shortcut of this regular function

// function loadPage()
// {
//    return new Promise((resolve)=>{
//       console.log('load page');
//       resolve();
//    }).then(()=>{
//       loadProductsFetch();
//    }).then(()=>{
//        return new Promise((resolve)=>{
//           resolve('value2');
//        });
//    });
// }
/*
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
  */

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
  

  
