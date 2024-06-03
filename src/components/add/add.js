
document.addEventListener('DOMContentLoaded', () => {
    const addFolderForm = document.getElementById('addFolderForm');
    const addBtn = document.getElementById('add-button');


    addFolderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = addFolderForm.querySelector('input[placeholder="Title"]').value;
        const director = addFolderForm.querySelector('input[placeholder="Director"]').value;
        const year = parseInt(addFolderForm.querySelector('input[placeholder="Year"]').value, 10);
        const content = addFolderForm.querySelector('input[name="contentType"]:checked').value;
        const genre = addFolderForm.querySelector('#genre').value;
        const durationHours = parseInt(addFolderForm.querySelector('#durationHours').value, 10);
        const durationMinutes = parseInt(addFolderForm.querySelector('#durationMinutes').value, 10);
        const duration = `${durationHours}h ${durationMinutes}m`;
        const watched = addFolderForm.querySelector('input[name="watched"]:checked').value === 'yes';
        const rating = parseInt(addFolderForm.querySelector('#rating').value, 10);
        const priority = parseInt(addFolderForm.querySelector('#priority').value, 10);
        const imageUrl = addFolderForm.querySelector('#imgUrl').value;
        const favorite = addFolderForm.querySelector('input[name="favourite"]').checked;

        const film = {
            title,
            director,
            year,
            content,
            genre,
            duration,
            watched,
            rating,
            priority,
            imageUrl,
            favorite,
            date: new Date().toISOString()
        };

        const films = JSON.parse(localStorage.getItem('films')) || [];
        films.push(film);
        localStorage.setItem('films', JSON.stringify(films));
        window.location.href = 'index.html';
    });



    // back buttons
    const backBtn = document.getElementById('back-button')


    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const cmdKey = isMac ? event.metaKey : event.altKey;

        if (cmdKey && event.key === 'a') {
            event.preventDefault(); // Prevent default browser behavior
            backBtn.click();
        }
    });


    // add height to empty div, based on the footer height
    function adjustPageExtension() {
        var footerHeight = document.querySelector('.footer').offsetHeight + 16;
        document.getElementById('page-extension').style.height = footerHeight + 'px';
    }
    window.addEventListener('load', adjustPageExtension);

    const genres = [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Sport",
        "Thriller",
        "War",
        "Western",
        "Superhero",
        "Disaster",
        "Anime",
        "Stop Motion",
        "Dark Comedy",
        "Romantic Comedy",
        "Historical",
        "Noir",
    ];




    const genreInput = document.getElementById('genre');
    const dropdown = document.querySelector('.dropdown-content');
    const selectedGenresDiv = document.getElementById('selected-genres');
    let selectedGenres = [];

    genreInput.addEventListener('keyup', filterFunction);
    genreInput.addEventListener('click', showDropdown);

    function showDropdown() {
        dropdown.classList.toggle("show");
        populateDropdown(genres);
    }

    function populateDropdown(items) {
        dropdown.innerHTML = "";
        items.forEach(item => {
            let div = document.createElement("div");
            div.textContent = item;
            div.onclick = () => selectGenre(item);
            dropdown.appendChild(div);
        });
    }

    function selectGenre(genre) {
        if (!selectedGenres.includes(genre)) {
            selectedGenres.push(genre);
            updateSelectedGenres();
        }
        genreInput.value = "";
        filterFunction();
    }

    function removeGenre(genre) {
        selectedGenres = selectedGenres.filter(g => g !== genre);
        updateSelectedGenres();
    }

    function updateSelectedGenres() {
        selectedGenresDiv.innerHTML = "";
        selectedGenres.forEach(genre => {
            let genreDiv = document.createElement("div");
            genreDiv.className = "selected-genre";
            let span = document.createElement("span");
            span.textContent = genre;
            let button = document.createElement("button");
            button.textContent = "x";
            button.onclick = () => removeGenre(genre);
            genreDiv.appendChild(span);
            genreDiv.appendChild(button);
            selectedGenresDiv.appendChild(genreDiv);
        });
    }

    function closeDropdown() {
        dropdown.classList.remove("show");
    }

    window.onclick = function (event) {
        if (!event.target.matches('#genre')) {
            closeDropdown();
        }
    }

    function filterFunction() {
        let input = genreInput.value.toLowerCase();
        let filteredGenres = genres.filter(genre => genre.toLowerCase().includes(input));
        populateDropdown(filteredGenres);
    }
});



