export  let cart=[
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
  }
];

  export function addToCart(productId)
{
      let matchingItem;

      const quantitySelector=document.querySelector(`.js-quantity-selector-${productId}`);

      const quantity=Number(quantitySelector.value) ;

      const addedSelector=document.querySelector(`.js-added-to-cart-${productId}`);

      addedSelector.classList.add("added-to-cart-visible");

      const addedMessageTimeouts={};

      let previousTimeOutId=addedMessageTimeouts[productId];

      if(previousTimeOutId)
      {
         clearTimeout(previousTimeOutId);
      } 
      let timeOutId=setTimeout(() => 
      {
        addedSelector.classList.remove("added-to-cart-visible")
      }, 2000);

      addedMessageTimeouts[productId]=timeOutId;

      cart.forEach((item)=>{
      if(productId===item.productId)
      { 
          matchingItem=item;
      }
      });
      if(matchingItem)
      {
        matchingItem.quantity+=quantity;
      }else{
      cart.push({
      productId,quantity
      })
      }
}
