class Cart
{

   cartItems=undefined ;

   localStorageKey=undefined ;
   
   addedMessageTimeouts ={} ;
   
   constructor(localStorageKey)
   { 
     this.localStorageKey=localStorageKey; 
     this.loadFromStorage();
 
   }
   loadFromStorage()
   {
       this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
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
   }

   saveToStorage() 
   {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) 
    {
        let matchingItem;
        let quantity;

        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        

        if (quantitySelector !== null) 
        {
          quantity = Number(quantitySelector.value); 

          const addedSelector = document.querySelector(`.js-added-to-cart-${productId}`);

          if (addedSelector)
          {
            addedSelector.classList.add("added-to-cart-visible");

            let previousTimeOutId = addedMessageTimeouts[productId];
            
            if (previousTimeOutId)
            {
              clearTimeout(previousTimeOutId);  
            }

             let timeOutId = setTimeout(() => 
            {
              addedSelector.classList.remove("added-to-cart-visible");
            }, 2000);

            addedMessageTimeouts[productId] = timeOutId;
          }
        } 
        else 
        {
           console.log("Input element is missing for productId:", productId);
        }

        
        this.cartItems.forEach((item) => 
        {
          if (productId === item.productId)
          {
            matchingItem = item;
          }
        });

        
        if (matchingItem) 
        {
           matchingItem.quantity += quantity;
        } else 
        {
          this.cartItems.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionId: '1'
           });
        }
        

        this.saveToStorage(); 
    }
    removeFromCart(productId) 
    {
      const newCart = this.cartItems.filter(cartItem => cartItem.productId !== productId);
      this.cartItems = newCart; // Update cart with new filtered list
      this.saveToStorage();
    }
    
    calculateCartQuantity() 
    {
      return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    }
    
    updateQuantity(productId, newQuantity)
    {
       this.cartItems.forEach((cartItem) => {
         if (cartItem.productId === productId) {
           cartItem.quantity = newQuantity;
         }
       });
       this.saveToStorage();
   }
   
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
  const cart= new Cart('cart-oop');

  const businessCart=new Cart('cart-business');
 
  console.log(cart);    

  console.log(businessCart); 
  
  console.log(businessCart instanceof Cart);
  

                                      
