export function searchbarValue() {
  const searchBar = document.querySelector(".js-search-bar");
  const searchButton = document.querySelector(".js-search-btn");

  if (!searchBar || !searchButton) return;

  function search() {
    const value = searchBar.value.trim();

    if (!value) return;

    window.location.href = `index.html?search=${encodeURIComponent(value)}`;
  }

  searchButton.addEventListener("click", search);

  searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      search();
    }
  });
}
