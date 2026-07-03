import { cart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { getProductItem, loadProductsFetch } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { searchbarValue } from "./utils/searchbar.js";

searchbarValue()

async function renderOrders() {
  await loadProductsFetch();

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  let orderHtml = "";

  orders.forEach((order) => {
    let productsHtml = "";

    order.products.forEach((orderProduct) => {
      const product = getProductItem(orderProduct.productId);

      if (!product) {
        return;
      }

      productsHtml += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>

          <div class="product-delivery-date">
            Arriving on: ${dayjs(orderProduct.estimatedDeliveryTime).format(
              "dddd, MMMM D",
            )}
          </div>

          <div class="product-quantity">
            Quantity: ${orderProduct.quantity}
          </div>

          <button class="buy-again-button button-primary">
            <img
              class="buy-again-icon"
              src="images/icons/buy-again.png"
            >
            <span class="buy-again-message">
              Buy it again
            </span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    orderHtml += `
      <div class="order-container">

        <div class="order-header">

          <div class="order-header-left-section">

            <div class="order-date">
              <div class="order-header-label">
                Order Placed:
              </div>

              <div>
                ${dayjs(order.orderTime).format("MMMM D")}
              </div>
            </div>

            <div class="order-total">
              <div class="order-header-label">
                Total:
              </div>

              <div>
                $${formatCurrency(order.totalCostCents)}
              </div>
            </div>

          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">
              Order ID:
            </div>

            <div>${order.id}</div>
          </div>

        </div>

        <div class="order-details-grid">
          ${productsHtml}
        </div>

      </div>
    `;
  });

  document.querySelector(".js-order-grid").innerHTML = orderHtml;

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

renderOrders();
