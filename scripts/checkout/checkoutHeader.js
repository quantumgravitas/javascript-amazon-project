import { calculateCartQuantity } from "../../data/cart.js";
 let checkoutHeaderHTML;
export function renderCheckoutHeader()
{
       checkoutHeaderHTML=`
      <div class="header-content">
        <div class="checkout-header-left-section">
            <a href="amazon.html">
              <img class="amazon-logo" src="images/amazon-logo.png">
              <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
            </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link"
          href="amazon.html">${calculateCartQuantity()}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
     </div>
    ` ;
      let checkoutHeader=document.querySelector('.js-checkout-header');
      checkoutHeader.innerHTML=checkoutHeaderHTML;
      
}
   