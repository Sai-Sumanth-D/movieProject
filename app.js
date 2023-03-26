const addMovieModal = document.getElementById("add-modal");
const firstAddMovieBttn = document.querySelector("header button");

const backdrop = document.getElementById("backdrop"); // since we know the id which we have as backdrop we can directly target the ID.
// const backdrop =document.body.firstElementChild; // this can also be used since the backdrop is the first child once the body has started.
const delMovieModal = document.getElementById("delete-modal");

const movies = [];

const showMovieModal = function () {
  addMovieModal.classList.toggle("visible");
  toggleBackdrop();
};

const toggleBackdrop = function () {
  backdrop.classList.toggle("visible");
};

function backdropClickHandler() {
  // this is created to handle the backdrop clicks to exit from the addMovieModal
  closeMovieModal();
  cancelMovieDeletion();
}

function cancelBtnHandler() {
  // this function is created to get back when the cancel button is clicked.
  closeMovieModal();
  clearMovieHandler();
}

const addMovieHandler = () => {
  const titleValue = userInputs[0].value; // we have to use value at the end because it is an input element.
  const imageValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    // this method is used to erase the unwanted spaces from start and end of userinput.
    alert("Please enter a valid value!!");
    // every condition is joined with a single alert for now, but can be specifically mentioned
    return;
  }
  const newMovies = {
    id: Math.random(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };

  movies.push(newMovies); // this is going to push the userInputs into movies.
  console.log(movies);
  closeMovieModal();
  clearMovieHandler();
  toggleBackdrop();
  updateUI();
  renderNewMovieElement(
    newMovies.id,
    newMovies.title,
    newMovies.image,
    newMovies.rating
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  // this function is created to dispaly the list on DOM (screen)

  const newMovieElement = document.createElement("li"); // this is going to create a list inside the unordered list
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
        <div class = 'movie-element_image'>
            <img src='${imageUrl}' height =300px width=200px  alt='${title}'>
        </div>

        <div class='movie-element_info'>
            <h2>${title}</h2>
            <p>${rating}/5 🌟 </p>    
        
        </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const userInputs = addMovieModal.querySelectorAll("input");

// const userInputs = addMovieModal.getElementByTagName('input') ; // even this can be used

const clearMovieHandler = () => {
  // this is to clear the user entered inputs when we hit cancel or reopen the add movie tab again.
  for (usrInput of userInputs) {
    usrInput.value = "";
  }
};

const entryTextSection = document.getElementById("entry-text");

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovieHandler = (movieId) => {
  delMovieModal.classList.add("visible");
  toggleBackdrop();
};
//     let movieIndex = 0;
//     for (const movie of movies){
//         if(movie.id === movieId){
//             break;
//         }
//         movieIndex++;
//     }
//     movies.splice(movieIndex,1);
//     const listRoot = document.getElementById('movie-list');
//     listRoot.children[movieIndex].remove(); // this will remove the movie at the movieIndex
// };

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const cancelBtn = addMovieModal.querySelector(".btn--passive");
const addBtn = document.getElementById("adding"); //selected the particular by using ID

firstAddMovieBttn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelBtn.addEventListener("click", cancelBtnHandler);
addBtn.addEventListener("click", addMovieHandler);
