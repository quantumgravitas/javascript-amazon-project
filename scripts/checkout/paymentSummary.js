import{cart,calculateCartQuantity} from '../../data/cart.js'
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryoptions.js';
import {currencyFormat} from '../utils/money.js';

export function renderPaymentSummary()
{ 
  let productPriceCents=0;
  let ShippingPriceCents=0;
  cart.forEach((cartItem)=>{
      const product=getProduct(cartItem.productId);
      productPriceCents+= product.priceCents*cartItem.quantity ;

      const  deliveryOption= getDeliveryOption(cartItem.deliveryOptionId);
      ShippingPriceCents+= deliveryOption.priceCents ;
  })
   console.log(productPriceCents);
   console.log(ShippingPriceCents);

   const totalBeforeTaxCents=productPriceCents+ShippingPriceCents;
   const taxCents=totalBeforeTaxCents*0.1 ;
   const totalCents=totalBeforeTaxCents+taxCents ;
   console.log(totalCents);

   const paymentSummaryHTML=`
      <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${calculateCartQuantity()}):</div>
          <div class="payment-summary-money">$${currencyFormat(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money js-payment-summary-money-shipping">$${currencyFormat(ShippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${currencyFormat(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${currencyFormat(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money js-payment-summary-money-total">$${currencyFormat(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
       `;
   document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;    

   
}