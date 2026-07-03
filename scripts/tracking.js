import { orders } from "../data/orders.js";
import { cart } from "../data/cart.js";
import { getProductItem, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { searchbarValue } from "./utils/searchbar.js";

const url = new URL(window.location.href);

const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");

searchbarValue();

async function loadPage() {
  await loadProductsFetch();

  // Find cart quantity
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // Find the order
  const matchingOrder = orders.find((order) => {
    return order.id === orderId;
  });

  if (!matchingOrder) {
    document.querySelector(".js-tracking").innerHTML =
      "<h2>Order not found.</h2>";
    return;
  }

  // Find the ordered product
  const matchingProduct = matchingOrder.products.find((product) => {
    return product.productId === productId;
  });

  if (!matchingProduct) {
    document.querySelector(".js-tracking").innerHTML =
      "<h2>Product not found.</h2>";
    return;
  }

  // Get product details
  const product = getProductItem(productId);

  // Calculate progress
  const currentTime = dayjs();
  const orderTime = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingProduct.estimatedDeliveryTime);

  let progress =
    ((currentTime.valueOf() - orderTime.valueOf()) /
      (deliveryTime.valueOf() - orderTime.valueOf())) *
    100;

  // Keep progress between 0 and 100
  progress = Math.max(0, Math.min(progress, 100));

  // Current delivery status
  let preparingClass = "";
  let shippedClass = "";
  let deliveredClass = "";

  if (progress < 50) {
    preparingClass = "current-status";
  } else if (progress < 100) {
    shippedClass = "current-status";
  } else {
    deliveredClass = "current-status";
  }

  const trackingHtml = `
    <div class="order-tracking">

      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryTime.format("dddd, MMMM D")}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingProduct.quantity}
      </div>

      <img
        class="product-image"
        src="${product.image}"
      >

      <div class="progress-labels-container">

        <div class="progress-label ${preparingClass}">
          Preparing
        </div>

        <div class="progress-label ${shippedClass}">
          Shipped
        </div>

        <div class="progress-label ${deliveredClass}">
          Delivered
        </div>

      </div>

      <div class="progress-bar-container">
        <div
          class="progress-bar"
          style="width: ${progress}%;">
        </div>
      </div>

    </div>
  `;

  document.querySelector(".js-tracking").innerHTML = trackingHtml;

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

loadPage();
