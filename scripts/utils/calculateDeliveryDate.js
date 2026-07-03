import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function isWeekend(date) {
  const day = date.day();

  return day === 0 || day === 6;
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;

  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  return deliveryDate.format("dddd, MMMM D");
}