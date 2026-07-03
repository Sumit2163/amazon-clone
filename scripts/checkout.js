// import { cars } from "../data/cars.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/cart-oop.js"; // (only for practice purpose)
// import "../data/cart-class.js"; // (only for practice purpose)
// import "../data/backend-pr.js"
import "../scripts/exercise/exercise.js";

// Asynchronous Function and Await

async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log("Unexpected error, Please try again later", error);
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

// complete all promises in single command
// Promise.all([
//   loadProductsFetch(),
//   loadCartFetch(),
// ]).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });

/*
// complete promises one by one
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
*/

/*
// callbacks 
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/
