import Sortable from "sortablejs";
// Vue JS Code

const app = new Vue({
  el: "#app",
  data: {
    oldIndex: 0,
    newIndex: 1,
    // Set the value of moviesList
    moviesList: [
      {
        Title: "Harry Potter and the Deathly Hallows: Part 2",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
      },
      {
        Title: "Harry Potter and the Sorcerer's Stone",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
      },
    ],
    ulClass: "list-group list-group-horizontal",
    noResponse: false,
    errorMessage: "No results!",
    inputText: "",
  },
  methods: {
    //  ES5 syntax (from Vue docs)
    // search: function (event) {
    //   console.log("You clicked the button")
    // },
    search() {
      // caling a method fetchMovies with user's input(inputText) as an argument
      this.fetchMovies(this.inputText);
    },
    fetchMovies(query) {
      fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // set noResponse to false if we have received the array of movies, and to true if the movies were not found
          this.noResponse = data.Response === "False";
          // set the data's moviesList array to the array of movies we receive from the API call (data.Search)
          this.moviesList = data.Search;
        });
    },
    initSortable() {
      const page = this;
      // let results = document.querySelector('#results')
      Sortable.create(this.$refs.results, {
        ghostClass: "ghost",
        animation: 150,
        onEnd: (event) => {
          page.oldIndex = event.oldIndex;
          page.newIndex = event.newIndex;
        },
      });
    },
  },
  mounted() {
    console.log("Hello!");
    this.initSortable();
    this.fetchMovies("harry potter");
  },
});

// Vanila JS code
// const list = document.querySelector("#results")

// const insertMovies = (data) => {
//   data.Search.forEach((result) => {
//     const movieTag = `<li class="list-group-item border-0">
//       <img src="${result.Poster}" alt="" width="100">
//     </li>`
//     list.insertAdjacentHTML("beforeend", movieTag)
//   })
// }

// const fetchMovies = (query) => {
//   fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`)
//     .then(response => response.json())
//     .then(insertMovies)
// }

// fetchMovies("harry potter") // on 1st page load

// const form = document.querySelector("#search-form")
// form.addEventListener("submit", (event) => {
//   event.preventDefault()
//   list.innerHTML = ""
//   const input = document.querySelector("#search-input")
//   fetchMovies(input.value)
// })
