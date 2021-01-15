const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1]; //another way of selectiing elements in the dom.
const startAddMovieButton = document.querySelector('header button'); //tag selector, elememt => tag
// const startAddMovieButton = document.querySelector('header').children[1];
const backdrop = document.getElementById('backdrop');

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive'); //cancel button

const confirmedAddMovieButton = cancelAddMovieButton.nextElementSibling; //dom traversal method selects 'add button'.
const userInputs = addMovieModal.querySelectorAll('input') //select all input tags
const deleteMovieModal = document.getElementById('delete-modal');


// will add html content, selects id of element.
const entryTextSection = document.getElementById('entry-text');


const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}; //toggle backdrop when event is toggled.




const updateUI = () => {
    if (movies.length === 0) { //access movies array.
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};
const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break; // loop ends if move match is found
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1); //removing index from array
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible'); //note node has to be added not toggled.
    toggleBackdrop(); //backdrop toggled after confirmation.

    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    // deletion button recreated without reference pointer, replaces previous eventlisteners to prevent duplication in memory each time the button is clicked(garbage disposal kicks in)

    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));

};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element'; //css class used
    newMovieElement.innerHTML = `
    <div class "movie-element__image"> 
    <img src = "${imageUrl}" alt = "${title}"
    </div>
        <div class= "movie-element__info">
        <h2> ${title}</h2>
        <p> ${rating}/5 stars!</p>
        </div>
    `;
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement); //adds renderNewMovieElement to movie-list id in the dom
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};


const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearMovieInput = () => {
    // userInputs[0].value = '';
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }

};
const cancelAddMovieHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
};


const addMovieHandler = () => {
    const titleValue = userInputs[0].value; //value(input element)
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || //trim object removes excess whitespace.
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid values (rating between 1 & 5'); //if statement used to ensure user enters correct data.
        return; //ends the function
    }
    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };



    // event handlers belo




    movies.push(newMovie);
    console.log(movies);
    closeMovieModal(); //closes the modal
    // toggleBackdrop()//code some how works without toggle, must review.
    closeMovieDeletionModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating); //IMAGE NOT SHOWING PLEASE FIX!
    updateUI(); //calls updateUi function

};
const backdropClickHandler = () => {
    closeMovieModal(); //makes the backdrop clickable
    closeMovieDeletionModal();
    clearMovieInput();
}

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmedAddMovieButton.addEventListener('click', addMovieHandler);