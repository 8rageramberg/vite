document.addEventListener('DOMContentLoaded', () => {
  let cardContainer = document.querySelector('.card-container');
  let markedCards = [];


  const footer = document.querySelector('.footer');

  // ADD overlay
  const addBtn = document.getElementById('add-button');

  // Settings overlay
  const settingsBtn = document.querySelector('.settings-button');
  const settingsOverlay = document.getElementById('settings');
  const SettingsRestoreBtn = document.querySelector('.default-films')

  // close buttons
  const closeBtns = document.querySelectorAll('.close-button')
  const films = JSON.parse(localStorage.getItem('films')) || [];

  function createCard() {
    cardContainer.innerHTML = '';
    films.forEach(film => {

      const filmCard = document.createElement('div');
      filmCard.className = 'card';

      const leftDiv = document.createElement('div');
      leftDiv.className = 'card-left';

      const rightDiv = document.createElement('div');
      rightDiv.className = 'card-right';

      const img = document.createElement('img');
      img.src = film.imageUrl;

      // Handle image error
      img.onerror = () => {
        img.src = '';
        img.alt = 'Image not found';

        if (!leftDiv.querySelector('.error-msg')) {
          const errorMsg = document.createElement('div');
          errorMsg.textContent = 'Image not found';
          errorMsg.style.color = 'red';
          errorMsg.className = 'error-msg';
          leftDiv.appendChild(errorMsg);
        }
      };

      img.alt = film.title;
      leftDiv.appendChild(img);

      const details = document.createElement('div');
      details.className = 'card-details';
      details.innerHTML = `
        <h2>${film.title}</h2>
        <p><strong>Director:</strong> ${film.director}</p>
        <p><strong>Year:</strong> ${film.year}</p>
        <p><strong>Content:</strong> ${film.content}</p>
        <p><strong>Genre:</strong> ${film.genre}</p>
        <p><strong>Duration:</strong> ${film.duration}</p>
        <p><strong>Watched:</strong> ${film.watched ? 'Yes' : 'No'}</p>
        <p><strong>Rating:</strong> ${film.rating !== null ? film.rating : 'None'}</p>
        <p><strong>Priority:</strong> ${film.priority}</p>
        <p><strong>Favorite:</strong> ${film.favorite ? 'Yes' : 'No'}</p>
       
      `;

      // <p><strong>Date:</strong> ${film.date.toLocaleString()}</p>
      rightDiv.appendChild(details);

      filmCard.appendChild(leftDiv);
      filmCard.appendChild(rightDiv);
      cardContainer.appendChild(filmCard);
    });
  }


  createCard();




  // card action
  const cardMarker = document.querySelectorAll(".card");
  const delBtn = document.querySelector(".delete-button")

  const optionsToggle = document.querySelector('.options-toggle');
  const optionsContent = document.querySelector('.options-content');

  const filterInput = document.querySelector('.search-input');


  // filter card
  function filterCards(inputValue) {
    const filterText = inputValue.toLowerCase();

    const filmCards = Array.from(document.querySelectorAll('.card'));

    filmCards.forEach(card => {
      const filmDetails = card.querySelector('.card-details');
      const textContent = filmDetails.textContent.toLowerCase();

      if (textContent.includes(filterText)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterInput.addEventListener('input', () => {
    const inputValue = filterInput.value.trim();
    filterCards(inputValue);
  });







  function updateButton() {
    if (markedCards.length === 1) {
      optionsToggle.textContent = "EDIT";
      optionsToggle.removeEventListener("click", toggleOptions);
      optionsToggle.addEventListener("click", editMarkedCard);
    } else {
      optionsToggle.textContent = "▵";
      optionsToggle.removeEventListener("click", editMarkedCard);
      optionsToggle.addEventListener("click", toggleOptions);
    }
  }

  // Event listener for marking cards
  cardMarker.forEach(card => {
    card.addEventListener("click", () => {
      if (markedCards.includes(card)) {
        // Remove card from markedCards
        markedCards = markedCards.filter(markedCard => markedCard !== card);
      } else {
        // Add card to markedCards
        markedCards.push(card);
      }

      updateButton();
      // Toggle the 'marked' class
      card.classList.toggle("marked");
    });
  });

  function deleteMarkedCards() {
    if (!markedCards || !Array.isArray(markedCards)) {
      console.log("Error: card container or marked cards not found.");
      return;
    }
    // Get the indices of the marked cards
    const markedIndices = markedCards.map(card => {
      return Array.from(cardContainer.children).indexOf(card);
    });

    markedIndices.sort((a, b) => b - a).forEach(index => {
      films.splice(index, 1);
    });

    markedCards.forEach(card => {
      cardContainer.removeChild(card);
    });
    markedCards = [];

    // Update local storage
    localStorage.setItem('films', JSON.stringify(films));

    // Clear the marked cards array
    markedCards = [];
  }

  // listeners

  function toggleOptions() {
    optionsContent.classList.toggle('show');
  }


  // Close the options dropdown when clicking outside of it
  window.addEventListener('click', (event) => {
    if (!event.target.matches('.options-toggle') && !event.target.closest('.options-content')) {
      optionsContent.classList.remove('show');
      footer.classList.remove('menu-open'); // Also remove the class from the footer
    }
  });


  settingsBtn.addEventListener('click', () => {
    settingsOverlay.classList.toggle('show');
    footer.classList.toggle('show');
    SettingsRestoreBtn.addEventListener('click', restoreDefaultFilms)
  });

  window.addEventListener('click', (event) => {
    if (event.target.matches('.settings')) {
      settingsOverlay.classList.remove('show');
      footer.classList.remove('show');
    }
  });

  // Close button event listeners
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // addOverlay.classList.remove('show');
      settingsOverlay.classList.remove('show');
      footer.classList.remove('show');
    });
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (event) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdKey = isMac ? event.metaKey : event.altKey;

    if (cmdKey && event.key === 'a') {
      event.preventDefault(); // Prevent default browser behavior
      // addOverlay.classList.toggle('show');
      addBtn.click()
      settingsOverlay.classList.remove('show');
    } else if (cmdKey && event.key === 'c') {
      event.preventDefault(); // Prevent default browser behavior
      closeBtns.forEach(btn => {
        btn.click();
      });
    } else if (cmdKey && event.key === 's') {
      event.preventDefault(); // Prevent default browser behavior
      settingsOverlay.classList.toggle('show');
      // addOverlay.classList.remove('show');
    }
    else if (cmdKey && event.key === 'p') {
      event.preventDefault(); // Prevent default browser behavior
      window.open("https://pornhub.com");
      // addOverlay.classList.remove('show');
    } else if (cmdKey && event.key === 'd') {
      event.preventDefault(); // Prevent default browser behavior
      delBtn.click();
      // addOverlay.classList.remove('show');
    }
  });




  // add height to empty div, based on the footer height
  function adjustPageExtension() {
    var footerHeight = document.querySelector('.footer').offsetHeight + 16;
    document.getElementById('page-extension').style.height = footerHeight + 'px';
  }

  window.addEventListener('load', adjustPageExtension);

  delBtn.addEventListener("click", deleteMarkedCards);

  optionsToggle.addEventListener('click', toggleOptions);


  function restoreDefaultFilms() {
    const films = [
      {
        title: 'Batman Begins',
        director: 'Christopher Nolan',
        year: 2005,
        content: 'Film',
        genre: 'Fantasy / Action',
        duration: '2h 20min',
        watched: true,
        rating: 9,
        priority: 1,
        favorite: true,
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',

      },
      {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        year: 2008,
        content: 'Film',
        genre: 'Fantasy / Action',
        duration: '2h 32min',
        watched: true,
        rating: 9.2,
        priority: 1,
        favorite: true,
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',

      },
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        content: 'Film',
        genre: 'Sci-Fi / Action',
        duration: '2h 28min',
        watched: true,
        rating: 8.8,
        priority: 2,
        favorite: true,
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',

      },
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        content: 'Film',
        genre: 'Sci-Fi / Action',
        duration: '2h 28min',
        watched: true,
        rating: 8.8,
        priority: 2,
        favorite: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',

      },
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        content: 'Film',
        genre: 'Sci-Fi / Action',
        duration: '2h 28min',
        watched: true,
        rating: 8.8,
        priority: 2,
        favorite: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',

      },
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        content: 'Film',
        genre: 'Sci-Fi / Action',
        duration: '2h 28min',
        watched: true,
        rating: 8.8,
        priority: 2,
        favorite: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',

      },
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        content: 'Film',
        genre: 'Sci-Fi / Action',
        duration: '2h 28min',
        watched: true,
        rating: 8.8,
        priority: 2,
        favorite: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',

      },
      {
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        content: 'Film',
        genre: 'Sci-Fi / Action',
        duration: '2h 28min',
        watched: true,
        rating: 8.8,
        priority: 2,
        favorite: true,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',

      },

    ];

    films.forEach(film => {

      const filmCard = document.createElement('div');
      filmCard.className = 'card';

      const leftDiv = document.createElement('div');
      leftDiv.className = 'card-left';

      const rightDiv = document.createElement('div');
      rightDiv.className = 'card-right';

      const img = document.createElement('img');
      img.src = film.imageUrl;

      // Handle image error
      img.onerror = () => {
        img.src = '';
        img.alt = 'Image not found';

        if (!leftDiv.querySelector('.error-msg')) {
          const errorMsg = document.createElement('div');
          errorMsg.textContent = 'Image not found';
          errorMsg.style.color = 'red';
          errorMsg.className = 'error-msg';
          leftDiv.appendChild(errorMsg);
        }
      };

      img.alt = film.title;
      leftDiv.appendChild(img);

      const details = document.createElement('div');
      details.className = 'card-details';
      details.innerHTML = `
        <h2>${film.title}</h2>
        <p><strong>Director:</strong> ${film.director}</p>
        <p><strong>Year:</strong> ${film.year}</p>
        <p><strong>Content:</strong> ${film.content}</p>
        <p><strong>Genre:</strong> ${film.genre}</p>
        <p><strong>Duration:</strong> ${film.duration}</p>
        <p><strong>Watched:</strong> ${film.watched ? 'Yes' : 'No'}</p>
        <p><strong>Rating:</strong> ${film.rating !== null ? film.rating : 'None'}</p>
        <p><strong>Priority:</strong> ${film.priority}</p>
        <p><strong>Favorite:</strong> ${film.favorite ? 'Yes' : 'No'}</p>
      `;
      rightDiv.appendChild(details);
      //        <p><strong>Date:</strong> ${film.date.toLocaleString()}</p>


      filmCard.appendChild(leftDiv);
      filmCard.appendChild(rightDiv);
      cardContainer.appendChild(filmCard);

      const films = JSON.parse(localStorage.getItem('films')) || [];
      films.push(film);
      localStorage.setItem('films', JSON.stringify(films));
      window.location.href = 'index.html';
    });
  }


});
