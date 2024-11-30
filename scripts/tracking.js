import{loadProductsFetch,getProduct} from '../data/products.js';
import { getOrder, getOrderedProduct } from '../data/orders.js';
import{ formatDate} from './orders.js' ;
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
async function loadTrackingPage()
{
  const url=new URL(window.location.href);

  const orderId=url.searchParams.get('orderId');

  const productId=url.searchParams.get('productId');

  await loadProductsFetch();
  
  const order=getOrder(orderId);

  const product=getProduct(productId); 

  const orderedProduct=getOrderedProduct(productId,order);
  
  function calculatePercentageProgress()
   { 
     const currentTime=dayjs();
     const orderTime=dayjs(order.orderTime);
     const deliveryTime=dayjs(orderedProduct.estimatedDeliveryTime);
     let percentageProgress=(((currentTime-orderTime)/(deliveryTime-orderTime))*100).toFixed(2) ;
     return percentageProgress;
   }
    calculatePercentageProgress();
     const trackingHTML=`
  
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatDate(orderedProduct.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity:${orderedProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${(calculatePercentageProgress()<50) ?'current-status':''}">
            Preparing
          </div>
          <div class="progress-label ${((calculatePercentageProgress()>=50 && calculatePercentageProgress()<100))?'current-status':''}">
            Shipped
          </div>
          <div class="progress-label ${(calculatePercentageProgress()>=100)?'current-status':''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${calculatePercentageProgress()}%"></div>
        </div>`

  document.querySelector('.js-order-tracking').innerHTML=trackingHTML; 
  
   
}
loadTrackingPage();
