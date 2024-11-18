import {addToCart,cart,loadFromStorage,removeFromCart,updateDeliveryOption} from '../../data/cart.js' ;
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
describe('test Suite: Add to Cart',()=>{
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    document.querySelector('.js-product-quantity-container').innerHTML=`
       <select class="js-quantity-selector-${productId1}">
          <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
           <option value="7">7</option>
           <option value="8">8</option>
           <option value="9">9</option>
           <option value="10">10</option>
        </select>
    `
  })
  afterEach(()=>{
     document.querySelector('.js-product-quantity-container').innerHTML='';
  })
  it('adds an existing product to the cart',()=>{
    spyOn(localStorage,'getItem').and.callFake(()=>{
     return JSON.stringify([{
       productId:productId1,
       quantity: 1,
       deliveryOptionId:'1'
       }])
   })
    
    loadFromStorage();
    addToCart(productId1);
    expect(cart.length).toEqual(1);  
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
     productId:productId1,
     quantity: 2,
     deliveryOptionId:'1'
    }]));
     
  });

  it('Adds new product to the cart',()=>{
     
     
     spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
     })
     loadFromStorage();
     addToCart(productId1);
     expect(cart.length).toEqual(1);  
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
     expect(cart[0].productId).toEqual(productId1);
     expect(cart[0].quantity).toEqual(1);
     expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId:productId1,
      quantity:1,
      deliveryOptionId:'1'
    }])); 
   });
     
})

describe('Test Suite:Remove From Cart',()=>{
  const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productId3="83d4ca15-0f35-48f5-b7a3-1ea210004f2e"; 
  beforeEach(()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return  JSON.stringify([{
        productId: productId1 ,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId:productId2 ,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
     

    });
  })
  it('Remove ProductId that is in the cart',()=>{
     loadFromStorage();
     removeFromCart(productId1);
     expect(cart.length).toEqual(1);
     removeFromCart(cart[0].productId);
     expect(cart.length).toEqual(0);

     expect(localStorage.setItem).toHaveBeenCalledTimes(2);

     expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([
      {
        productId:productId2 ,
        quantity: 1,
        deliveryOptionId: '2'
      }]));
      
      expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([]));
  });

  it('Remove ProductId that is not in the cart',()=>{
    loadFromStorage();
    removeFromCart(productId3);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
      productId: productId1 ,
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId:productId2 ,
      quantity: 1,
      deliveryOptionId: '2'
    }]));

  });
})


describe(' Test Suite:Update delivery Option',()=>{
   const productId1="e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
   const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
   
    beforeEach(()=>{
     spyOn(localStorage,'setItem');
     spyOn(localStorage,'getItem').and.callFake(()=>{
           return JSON.stringify([{productId: productId1 ,
            quantity: 2,
            deliveryOptionId: '1'
          },
          {
            productId:productId2 ,
            quantity: 1,
            deliveryOptionId: '2'
          }])
      })  
  
    })
      it('update the delivery option of product in the cart',()=>{
         loadFromStorage();
         updateDeliveryOption(productId1,'3'); 

         expect(cart[0].productId).toEqual(productId1);

         expect(cart[0].deliveryOptionId).toEqual('3');
        
         expect(cart[0].quantity).toEqual(2);

         expect(localStorage.setItem).toHaveBeenCalledTimes(1);

         expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId: productId1 ,
          quantity: 2,
          deliveryOptionId: '3'
        },
        {
          productId:productId2 ,
          quantity: 1,
          deliveryOptionId: '2'
        }]));

        updateDeliveryOption(productId2,'1');

        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
       
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{productId: productId1 ,
          quantity: 2,
          deliveryOptionId: '3'
        },
        {
          productId:productId2 ,
          quantity: 1,
          deliveryOptionId: '1'
        }]));
      })


      it('update the deliveryOption of product that is not in the cart',()=>{
        loadFromStorage(); 
        updateDeliveryOption('does-not-exist','3');
        expect(cart.length).toEqual(2);

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);

        expect(localStorage.setItem).not.toHaveBeenCalledWith();
      })
        
       it('use a deliveryOptionId that does not exist',()=>{
        loadFromStorage();
        updateDeliveryOption(productId1,'does-not-exist');

        expect(cart.length).toEqual(2);

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);

        expect(localStorage.setItem).not.toHaveBeenCalledWith();
   
       })
 

  })
