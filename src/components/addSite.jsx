import React, { useState, useEffect } from 'react';

function AddSite() {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genreInput, setGenreInput] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const genres = [
        "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama",
        "Family", "Fantasy", "History", "Horror", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport",
        "Thriller", "War", "Western", "Superhero", "Disaster", "Anime", "Stop Motion", "Dark Comedy",
        "Romantic Comedy", "Historical", "Noir",
    ];
    const handleGenreInputChange = (event) => {
        setGenreInput(event.target.value);
    };

    const addGenre = (genreToAdd) => {
        if (genreToAdd && !selectedGenres.includes(genreToAdd)) {
            setSelectedGenres([...selectedGenres, genreToAdd]);
        }
        setGenreInput('');
        setDropdownVisible(false);
    };

    const removeGenre = (genreToRemove) => {
        const updatedGenres = selectedGenres.filter(genre => genre !== genreToRemove);
        setSelectedGenres(updatedGenres);
    };

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (!document.getElementById('genreDropdown').contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const storedMarkedFilm = localStorage.getItem('markedCard');

        if (storedMarkedFilm) {
            const parsedMarkedFilm = JSON.parse(storedMarkedFilm);
            document.getElementById('title').value = parsedMarkedFilm.title;
            document.getElementById('director').value = parsedMarkedFilm.director;
            document.getElementById('year').value = parsedMarkedFilm.year;
            document.getElementById('durationHours').value = parsedMarkedFilm.durationHours;
            document.getElementById('durationMinutes').value = parsedMarkedFilm.durationMinutes;
            document.getElementById('rating').value = parsedMarkedFilm.rating;
            document.getElementById('priority').value = parsedMarkedFilm.priority;
            document.getElementById('imageUrl').value = parsedMarkedFilm.imageUrl;

            // Set radio button value
            const content = document.querySelector(`input[name='content'][value='${parsedMarkedFilm.content ? 'film' : 'tv'}']`);
            if (content) {
                content.checked = true;
            }

            // Set radio button value
            const watchedRadio = document.querySelector(`input[name='watched'][value='${parsedMarkedFilm.watched ? 'yes' : 'no'}']`);
            if (watchedRadio) {
              watchedRadio.checked = true;
            }
      
            // Set checkbox value
            const favouriteCheckbox = document.querySelector('input[name="favourite"]');
            if (favouriteCheckbox) {
              favouriteCheckbox.checked = parsedMarkedFilm.favourite;
            }
            // Set genres
            setSelectedGenres(parsedMarkedFilm.genre.split(' / '));
          }
        }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const film = {
            title: formData.get('title'),
            director: formData.get('director'),
            year: formData.get('year'),
            content: formData.get('content'),
            genre: selectedGenres.join(', '),
            durationHours: formData.get('durationHours'),
            durationMinutes: formData.get('durationMinutes'),
            watched: formData.get('watched') === 'yes' ? true : false,
            rating: formData.get('rating'),
            priority: formData.get('priority'),
            imageUrl: formData.get('imageUrl'),
            favourite: event.target.favourite.checked,
            marked: false,
        };

        // Add the film to local storage
        const films = JSON.parse(localStorage.getItem('films')) || [];
        films.push(film);
        localStorage.setItem('films', JSON.stringify(films));

        // Clear form fields
        event.target.reset();
        setSelectedGenres([]);

    };

    return (
        <div id="add-site" className="add-site">
            <div className="overlay-content">
                <form id="addFolderForm" onSubmit={handleFormSubmit}>

                    <input type="text" placeholder="Title" name='title' id='title' required tabIndex="1" />
                    <input type="text" placeholder="Director" name='director' id='director' required tabIndex="2" />
                    <input type="number" placeholder="Year" name='year' id='year' required tabIndex="3" />

                    <label>What type of content:</label>
                    <div className="radio-buttons">
                        <input type="radio" id="radio-button-1" name="content" value="film" required />
                        <label htmlFor="radio-button-1" tabIndex="4">FILM</label>

                        <input type="radio" id="radio-button-2" name="content" value="tv" required />
                        <label htmlFor="radio-button-2" tabIndex="5">TV</label>

                        
                    </div>
                    <label>Genre:</label>
                    <div className="dropdown">
                        <input
                            type="text"
                            id="genreDropdown"
                            value={genreInput}
                            onChange={handleGenreInputChange}
                            onFocus={() => setDropdownVisible(true)}
                            placeholder="Select or type a genre"
                            tabIndex="6"
                        />
                        {dropdownVisible && (
                            <div className="dropdown-content">
                                {genres
                                    .filter(genre => !selectedGenres.includes(genre) && genre.toLowerCase().includes(genreInput.toLowerCase()))
                                    .map(filteredGenre => (
                                        <div
                                            key={filteredGenre}
                                            className="dropdown-item"
                                            onClick={() => addGenre(filteredGenre)}
                                        >
                                            {filteredGenre}
                                        </div>
                                    ))}
                            </div>
                        )}
                        <div className="selected-genres">
                            {selectedGenres.map((genre, index) => (
                                <div key={index} className="selected-genre">
                                    {genre}
                                    <button type="button" onClick={() => removeGenre(genre)}>x</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <label htmlFor="durationHours">Duration (hours):</label>
                    <input type="number" id="durationHours" name='durationHours' required tabIndex="7" />
                    <label htmlFor="durationMinutes">Duration (minutes):</label>
                    <input type="number" id="durationMinutes" name='durationMinutes' required tabIndex="8" />

                    <label>Have you seen it or not?</label>
                    <div className="radio-buttons">
                        <input type="radio" id="radio-button-3" name="watched" value="no" required />
                        <label htmlFor="radio-button-3" tabIndex="9">NO</label>

                        <input type="radio" id="radio-button-4" name="watched" value="yes" required />
                        <label htmlFor="radio-button-4" tabIndex="10">Yes</label>
                    </div>

                    <label htmlFor="rating">Rating:</label>
                    <input type="float" id="rating" min="0" max="10" name='rating' tabIndex="11" />

                    <label htmlFor="priority">Priority:</label>
                    <input type="number" id="priority" min="1" name='priority' required tabIndex="12" />

                    <label htmlFor="imgUrl">Image URL:</label>
                    <input type="text" id="imageUrl" tabIndex="13" name='imageUrl' />

                    <div className="custom-checkbox">
                        <input name="favourite" type="checkbox" id="custom-checkbox" className="custom-checkbox" />
                        <label htmlFor="custom-checkbox" tabIndex="14">FAVOURITE</label>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddSite;




