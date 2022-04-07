const list = document.querySelector("#results")

const insertMovies = (data) => {
  data.Search.forEach((result) => {
    const movieTag = `<li class="list-group-item border-0">
      <img src="${result.Poster}" alt="" width="100">
    </li>`
    list.insertAdjacentHTML("beforeend", movieTag)
  })
}

const fetchMovies = (query) => {
  fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`)
    .then(response => response.json())
    .then(insertMovies)
}

fetchMovies("harry potter") // on 1st page load

const form = document.querySelector("#search-form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  list.innerHTML = ""
  const input = document.querySelector("#search-input")
  fetchMovies(input.value)
})
