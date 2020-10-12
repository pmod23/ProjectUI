// Define API Key
const apiKey = "eBc6ImzS5eQd9TfihFKfB3HchqTOkMN5rfMaSXnI";

// Define Base URL
const baseURL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

// Combine Base URL and api Key
const url = `${baseURL}?sol=1000&page=1&api_key=${apiKey}`;

let photos = [];

const modal = document.querySelector(".modal");

const modalCloseButton = document.querySelector(".modal__close");

modalCloseButton.addEventListener("click", () => modal.classList.add("hidden"));

const showModal = (data) => {
  document.getElementById("launch-date").textContent = data.rover.launch_date;
  document.getElementById("landing-date").textContent = data.rover.landing_date;
  document.getElementById("active-status").textContent = data.rover.status;

  console.log(data);

  modal.classList.remove("hidden");
};

// This is what we want after the feetch request is completed
const doAfterFetch = (response) => {
  return response.json();
};

const doAfterJSONConversion = (response) => {
  photos = response.photos;

  const grid = document.querySelector(".grid");

  for (let i = 0; i < photos.length; i++) {
    grid.insertAdjacentHTML(
      "beforeend",
      `<div class="grid__item"><img src="${photos[i].img_src}" alt="${photos[i].earth_date}" data-index="${i}"></div>`
    );
  }

  grid.addEventListener("click", (e) => {
    const img = e.target.closest("img");

    if (!img) return;

    const index = parseInt(img.dataset.index);

    showModal(photos[index]);
  });
};

// Init Fetch Request
fetch(url)
  .then(doAfterFetch)
  .then(doAfterJSONConversion)
  .catch((error) => console.log(error));

//End of Code
