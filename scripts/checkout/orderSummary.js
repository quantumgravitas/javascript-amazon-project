import {cart,removeFromCart,updateDeliveryOption,updateQuantity,calculateCartQuantity} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {currencyFormat} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryoptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
//default export -when we only want to export only one thing
//importing the esm versions of the libraries so that we can use variables of same names in different files

 export function renderOrderSummary()
{
  
  let cartSummaryHTML='';

  cart.forEach((cartItem)=>{
      const productId=cartItem.productId;

      const matchingProduct=getProduct(productId);

      const deliveryOptionId=cartItem.deliveryOptionId;
       const deliveryOption=getDeliveryOption(deliveryOptionId);

  const today=dayjs();
  
  const deliveryDate=today.add(deliveryOption.deliveryDays, 'days');
  const dateString=deliveryDate.format('dddd, MMMM D');
    cartSummaryHTML+= 
   ` <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date:${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${currencyFormat(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary  js-update-quantity-link"
              data-product-id=${matchingProduct.id}>
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link  link-primary  js-save-quantity-link" data-product-id=${matchingProduct.id}>Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>
  ` ;
})



function deliveryOptionsHTML(matchingProduct,cartItem)
{   
        let html='';
        deliveryOptions.forEach((deliveryOption)=>{
          
            const today=dayjs();
            const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
            const dateString=deliveryDate.format('dddd, MMMM D');
            const priceString= deliveryOption.priceCents===0 ? 'FREE' : `$${currencyFormat(deliveryOption.priceCents)}-`  ;
            const ischecked=  deliveryOption.id === cartItem.deliveryOptionId ;
            
          html+=  `<div class="delivery-option  js-delivery-option"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}" >
                    <input type="radio" ${ischecked ? 'checked' : ''} 
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}">

                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>`
        })
        return html;
    }


    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

    document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
      
      link.addEventListener('click',()=>{
              const{productId}=link.dataset ;
              removeFromCart(productId);
              const container= document.querySelector(`.js-cart-item-container-${productId}`);
              container.remove();
              document.querySelector('.js-return-to-home-link').innerHTML=`${calculateCartQuantity()} items`;
              renderPaymentSummary();
        })
    })

    document.querySelector('.js-return-to-home-link').innerHTML=`${calculateCartQuantity()} items`;

    document.querySelectorAll('.js-update-quantity-link').forEach((link)=>{
          link.addEventListener('click',()=>{
          const{productId}=link.dataset ;
          const container=document.querySelector(`.js-cart-item-container-${productId}`) ;
          container.classList.add("is-editing-quantity");
        }) 
    })
    document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
    link .addEventListener('click',()=>{
        saveQuantity(link);
            }) ;
      
    })    
    function saveQuantity(link)
    {
        const {productId}=link.dataset ;
        const newQuantity= Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        if(newQuantity>0 && newQuantity<=1000)
        {
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity ;
            updateQuantity(productId,newQuantity);
            document.querySelector('.js-return-to-home-link').innerHTML=`${calculateCartQuantity()} items`;
        }
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove("is-editing-quantity");
        renderPaymentSummary();
    }

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId}=element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    })
}




  


