import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import '../data/cart-class.js';
import { loadProducts,loadProductsFetch,products } from "../data/products.js";
import { loadCart,loadCartFetch } from "../data/cart.js";
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
   try{
        //throw 'error1';
        await loadProductsFetch();

        await new Promise((resolve,reject)=>{
        //throw 'error2' ; 
        loadCartFetch(()=>{
          //reject('error3');
          resolve();
          })
    
      })
    }
    catch(error)
    {  
        console.log(error);
        console.log('Unexpected Error: please try again later');
    }
   
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

await Promise.all([
  loadProductsFetch(),
  loadCartFetch()
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
  

  
