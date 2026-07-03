/*
const xhr = new XMLHttpRequest()

xhr.addEventListener("load", () => {
  console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev/greeting')
xhr.send()
*/

/*
function greetingBack() {
  const promise = fetch("https://supersimplebackend.dev/greeting")
   .then((response) => response.text())
   .then((text) => console.log(text))

  return promise;
}

greetingBack();
*/

/*
async function greetingBack() {
  await fetch("https://supersimplebackend.dev/greeting")
    .then((response) => response.text())
    .then((text) => console.log(text));
}

greetingBack()
*/

/*
async function greetingPost() {
  const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Smit",
    }),
  });

  const name = await response.text();
  console.log(name);
}

greetingPost()
*/

/*
async function amazonFetch() {
    await fetch("https://amazon.com")
     .then((response) => response.text())
     .then((text) => console.log(text));
}

amazonFetch();
*/

/*
async function amazonFetch() {
  try {
    await fetch("https://amazon.com")
      .then((response) => response.text())
      .then((text) => console.log(text));
  } catch (error) {
    console.log('CORS error, Your request was blocked by the backend')
  }
}
amazonFetch();
*/

async function greetingPost() {
  try {
    const response = await fetch("https://supersimplebackend.dev/greeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Smit",
      }),
    });

    const name = await response.text();
    console.log(name);
  } catch (error) {
    if (error.status === 400) {
      throw await error.json();
    } else console.log("Network error, Try again later");
  }
}

greetingPost();
