import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import '../data/cart-class.js';
import {loadProducts} from '../data/products.js';
//import '../data/backend-practice.js';
//import '../data/car.js';

loadProducts(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
  
