export const orders=JSON.parse(localStorage.getItem('orders'))||[];

export function addOrder(order)
{
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage()
{
  localStorage.setItem('orders',JSON.stringify(orders));
}

export function getOrder(orderId)
{
  let matchingOrder;
  orders.forEach((order)=>{
    if(order.id===orderId)
    {
      matchingOrder=order ;
    }
  });
  return matchingOrder ;
}

export function getOrderedProduct(productId,order)
{
  let matchingOrderedProduct;
  
  order.products.forEach((productDetails)=>{
    if(productDetails.productId===productId)
    {
       matchingOrderedProduct=productDetails;
    }
  })
 return matchingOrderedProduct ;
}