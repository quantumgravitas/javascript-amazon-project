import { checkValidDeliveryOption } from "./deliveryoptions.js";
function Cart(localStorageKey){

  const cart={
    cartItems :undefined,
 
    loadFromStorage()
                   {
                       this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
                       if (!this.cartItems) {
                         this.cartItems = [
                         {
                           productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                           quantity: 2,
                           deliveryOptionId: '1'
                         },
                         {
                           productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                           quantity: 1,
                           deliveryOptionId: '2'
                         }
                       ];
                     }
                   },
 
     saveToStorage() {
                        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
                     },
     addedMessageTimeouts :{},
 
     addToCart(productId) {
                             let matchingItem;
                             let quantity;
                           
                             // Correcting the selector to handle class selection
                             const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
                             
                             if (quantitySelector !== null) {
                               quantity = Number(quantitySelector.value); // Read the quantity value
                               const addedSelector = document.querySelector(`.js-added-to-cart-${productId}`);
                               if (addedSelector) {
                                 addedSelector.classList.add("added-to-cart-visible");
                           
                                 // Manage the timeout for hiding the "added to cart" message
                                 let previousTimeOutId = addedMessageTimeouts[productId];
                                 if (previousTimeOutId) {
                                   clearTimeout(previousTimeOutId);  // Clear previous timeout if exists
                                 }
                           
                                 let timeOutId = setTimeout(() => {
                                   addedSelector.classList.remove("added-to-cart-visible");
                                 }, 2000);
                           
                                 addedMessageTimeouts[productId] = timeOutId;  // Store the new timeout ID
                               }
                             } else {
                               console.log("Input element is missing for productId:", productId);
                             }
                           
                             // Update cart with the new or existing item
                             this.cartItems.forEach((item) => {
                               if (productId === item.productId) {
                                 matchingItem = item;
                               }
                             });
                           
                             // If the item already exists in the cart, update its quantity
                             if (matchingItem) {
                               matchingItem.quantity += quantity;
                             } else {
                               // If the item doesn't exist, add it to the cart
                             this.cartItems.push({
                                 productId: productId,
                                 quantity: quantity,
                                 deliveryOptionId: '1'
                               });
                             }
                           
                             this.saveToStorage(); // Save the updated cart to localStorage
                     },
 
     removeFromCart(productId) 
                     {
                       const newCart = this.cartItems.filter(cartItem => cartItem.productId !== productId);
                       this.cartItems = newCart; // Update cart with new filtered list
                       this.saveToStorage();
                     },
 
     calculateCartQuantity() 
                     {
                       return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
                     },
 
     updateQuantity(productId, newQuantity)
                      {
                         this.cartItems.forEach((cartItem) => {
                           if (cartItem.productId === productId) {
                             cartItem.quantity = newQuantity;
                           }
                         });
                         this.saveToStorage();
                     },
     updateDeliveryOption(productId, deliveryOptionId) 
                       {
                           const matchingCartItem = this.cartItems.find(cartItem => cartItem.productId === productId);
                           if (!matchingCartItem) {
                             return ;
                           }
                           if(!checkValidDeliveryOption(deliveryOptionId))
                           {
                             return ;
                           }
                             matchingCartItem.deliveryOptionId = deliveryOptionId;
                             this.saveToStorage();
                     }
       }
       return cart;
}

const cart=Cart('cart-oop');

const BusinessCart=Cart('cart-business');

cart.loadFromStorage();

BusinessCart.loadFromStorage();  

console.log(cart);    

console.log(BusinessCart);
                                      