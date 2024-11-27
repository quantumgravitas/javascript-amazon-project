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

export function saveToStorage()
{
  localStorage.setItem('cart', JSON.stringify(cart));
}


const addedMessageTimeouts = {};


export function addToCart(productId)
{
    let matchingItem;
    let quantity;
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

  if (quantitySelector !== null) 
  {
      quantity = Number(quantitySelector.value);

      const addedSelector = document.querySelector(`.js-added-to-cart-${productId}`);

      if(addedSelector)
      {
        addedSelector.classList.add("added-to-cart-visible");

        let previousTimeOutId = addedMessageTimeouts[productId];
        if (previousTimeOutId)
        {
          clearTimeout(previousTimeOutId);
        }

        let timeOutId = setTimeout(() => {
          addedSelector.classList.remove("added-to-cart-visible");
        }, 2000);

        addedMessageTimeouts[productId] = timeOutId; 
      }
  }else
  {
    console.log("Input element is missing for productId:", productId);
    quantity=1 ;
  }

  
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}



export function removeFromCart(productId) {
  const newCart = cart.filter(cartItem => cartItem.productId !== productId);
  cart = newCart; 
  saveToStorage();
}


export function calculateCartQuantity() {
  return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
}


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

