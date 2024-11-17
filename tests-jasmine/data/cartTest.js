import {addToCart,cart,loadFromStorage} from '../../data/cart.js' ;
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
