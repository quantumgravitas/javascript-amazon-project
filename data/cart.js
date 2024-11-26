// export  let cart=JSON.parse(localStorage.getItem('cart'));

import { checkValidDeliveryOption} from "./deliveryoptions.js";



// if(!cart)
// {
//   cart=[
//     {
//       productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//       quantity:2,
//       deliveryOptionId:'1'
//     },
//     {
//       productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
//       quantity:1,
//       deliveryOptionId:'2'
//     }
//   ];
  
// }

//  function saveToStorage()
// {
//   localStorage.setItem('cart',JSON.stringify(cart));
// }

//   export function addToCart(productId)
// {
//       let matchingItem;

//       const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);
      
//       const quantity=Number(quantitySelector.value) ;
//       console.log(quantity);
//       const addedSelector=document.querySelector(`.js-added-to-cart-${productId}`);

//       addedSelector.classList.add("added-to-cart-visible");

//       const addedMessageTimeouts={};

//       let previousTimeOutId=addedMessageTimeouts[productId];

//       if(previousTimeOutId)
//       {
//          clearTimeout(previousTimeOutId);
//       } 
//       let timeOutId=setTimeout(() => 
//       {
//         addedSelector.classList.remove("added-to-cart-visible")
//       }, 2000);

//       addedMessageTimeouts[productId]=timeOutId;

//       cart.forEach((item)=>{
//       if(productId===item.productId)
//       { 
//           matchingItem=item;
//       }
//       });
//       if(matchingItem)
//       {
//         matchingItem.quantity+=quantity;
//       }else{
//       cart.push({
//       productId:productId,
//       quantity:quantity,
//       deliveryOptionId:'1'
//         })
//       }
//      saveToStorage(); 
// }

//  export function removeFromCart(productId)
// {
//    const newCart=[];

//    cart.forEach((cartItem)=>{
//      if(cartItem.productId!==productId)
//      {
//         newCart.push(cartItem);
//      }
//    })
//    cart=newCart ;
//    saveToStorage();
// }

//  export function calculateCartQuantity()
// {
//    let cartQuantity=0 ;
//    cart.forEach((cartItem)=>{
//      cartQuantity+=cartItem.quantity
//    })
//    return cartQuantity ;
// }

//  export function updateQuantity(productId,newQuantity)
// {   
//     cart.forEach((cartItem)=>{
//      if(cartItem.productId===productId)
//      {
//         cartItem.quantity=newQuantity;
//      }
//     })
//    saveToStorage();
// }

//  export function updateDeliveryOption(productId,deliveryOptionId)
// {
//     let matchingCartItem ;
//     cart.forEach((cartItem)=>{
//       if(cartItem.productId===productId)
//       {
//          matchingCartItem=cartItem ;
//       }
//     })
//     matchingCartItem.deliveryOptionId=deliveryOptionId;

//     saveToStorage();
// }

// Initialize cart from localStorage, or use a default if not available
export let  cart ;

export function loadFromStorage()
{
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [
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

}

loadFromStorage();
// Save the cart to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Timeout manager for added to cart messages
const addedMessageTimeouts = {};  // Declare this outside the function to preserve across calls

// Add product to cart
export function addToCart(productId) {
  let matchingItem;
  let quantity;

  // Correcting the selector to handle class selection
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  
  if (quantitySelector !== null) {
    quantity = Number(quantitySelector.value); // Read the quantity value
    console.log(quantity);
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
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  // If the item already exists in the cart, update its quantity
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    // If the item doesn't exist, add it to the cart
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage(); // Save the updated cart to localStorage
}

// Remove product from cart
export function removeFromCart(productId) {
  const newCart = cart.filter(cartItem => cartItem.productId !== productId);
  cart = newCart; // Update cart with new filtered list
  saveToStorage();
}

// Calculate total quantity of items in the cart
export function calculateCartQuantity() {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

// Update the quantity of a specific product in the cart
export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

// Update the delivery option for a specific product in the cart
export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingCartItem = cart.find(cartItem => cartItem.productId === productId);
  if (!matchingCartItem) {
    return ;
  }
  if(!checkValidDeliveryOption(deliveryOptionId))
   {
    return ;
   }
    matchingCartItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}
   
export function loadCart(fun)
{
  const xhr=new XMLHttpRequest();

  xhr.addEventListener('load',()=>{
     console.log(xhr.response);
     fun();
  })
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}

export async  function loadCartFetch(fun)
{
   const response=  await fetch('https://supersimplebackend.dev/cart');

   const message= await response.text();
   
   console.log(message);
   fun();
}
