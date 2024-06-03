


import React, { useEffect, useState } from 'react';

const Cards = ({ adjustPageExtension, markedCards, setMarkedCards }) => {

    const filmsData = [
        {   
            
            title: 'Batman Begins',
            director: 'Christopher Nolan',
            year: 2005,
            content: 'Film',
            genre: 'Fantasy / Action',
            durationMinutes: 2,
            durationHours: 3,
            watched: true,
            rating: 9,
            priority: 1,

            favourite: true,
            imageUrl: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
            marked: false,
            showing: false
        },
        {
            title: 'The Dark Knight',
            director: 'Christopher Nolan',
            year: 2008,
            content: 'Film',
            genre: 'Fantasy / Action',
            durationMinutes: 2,
            durationHours: 3,
            watched: true,
            rating: 9.2,
            priority: 1,

            favourite: true,
            imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
            marked: false,
            showing: false
        },
        {
           
        
            title: 'HELLP',
            director: 'Christopher Nolan',
            year: 2010,
            content: 'Film',
            genre: 'Sci-Fi / Action',
            durationMinutes: 2,
            durationHours: 3,
            watched: true,
            rating: 8.8,
            priority: 2,

            favourite: true,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',
            marked: false,

        },
        {
            title: 'MYFILM',
            director: 'Christopher Nolan',
            year: 2010,
            content: 'Film',
            genre: 'Sci-Fi / Action',
            durationMinutes: 2,
            durationHours: 3,
            watched: true,
            rating: 8.8,
            priority: 2,

            favourite: true,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',
            marked: false,

        },
        {
            title: 'YELLO',
            director: 'Christopher Nolan',
            year: 2010,
            content: 'Film',
            genre: 'Sci-Fi / Action',
            durationMinutes: 2,
            durationHours: 3,
            watched: true,
            rating: 8.8,
            priority: 2,

            favourite: true,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',
            marked: false,

        },
        {
            title: 'FILM 2',
            director: 'Christopher Nolan',
            year: 2010,
            content: 'Film',
            genre: 'Sci-Fi / Action',
            durationMinutes: 2,
            durationHours: 3,
            watched: true,
            rating: 8.8,
            priority: 2,

            favourite: true,
            imageUrl: '',
            marked: false,

        },
        {
            title: 'FIGHT CLUB',
            director: 'Christopher Nolan',
            year: 2010,
            content: 'Film',
            genre: 'Sci-Fi / Action',
            durationMinutes: 2,
            durationHours: 3,
            watched: true,
            rating: 8.8,
            priority: 2,

            favourite: true,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',
            marked: false,

        },
    ];

    
    const defaultFilms = filmsData.map((film, index) => ({
        ...film,
        key: `${film.title}-${index}`
    }));

    const [films, setFilms] = useState([]);
    const [hasImageError, setHasImageError] = useState({});

    const handleImageError = (index) => {
        setHasImageError((prevErrors) => ({
            ...prevErrors,
            [index]: true,
        }));
    };

    useEffect(() => {
        const storedFilms = JSON.parse(localStorage.getItem('films')) || [];
        if (storedFilms.length === 0) {
            localStorage.setItem('films', JSON.stringify(defaultFilms));
            setFilms(defaultFilms);
        } else {
            setFilms(storedFilms);
        }
    }, []); // <- Empty dependency array to run once

    const handleCardClick = (index) => {
        const clickedFilm = films[index];
        const updatedFilms = [...films];
        updatedFilms[index].marked = !updatedFilms[index].marked;
        localStorage.setItem('films', JSON.stringify(updatedFilms));
    
        // Add 'key' property to the clicked film
        const markedCard = { ...clickedFilm, key: `${clickedFilm.title}-${index}` };
    
        if (updatedFilms[index].marked) {
            localStorage.setItem('markedCard', JSON.stringify(markedCard));
        } else {
            localStorage.removeItem('markedCard');
        }
    
        setMarkedCards((prevMarkedCards) =>
            prevMarkedCards.includes(clickedFilm)
                ? prevMarkedCards.filter((card) => card !== clickedFilm)
                : [...prevMarkedCards, clickedFilm]
        );
    
        setFilms(updatedFilms);
    };



    const createCard = () => {
        return films.map((film, index) => {
            const durationHours = parseInt(film.durationHours, 10);
            const durationMinutes = parseInt(film.durationMinutes, 10);
            const duration = `${durationHours}h ${durationMinutes}m`;

            adjustPageExtension();
            return (
                <div
                    key={film.key}
                    className={`card ${markedCards.includes(film) ? 'marked' : ''}`}
                    onClick={() => handleCardClick(index)}
                >
                    <div className="card-left">
                        <img
                            src={film.imageUrl}
                            alt={film.title}
                            onError={() => handleImageError(index)}
                        />
                        {hasImageError[index] && (
                            <div className="error-msg" style={{ color: 'red' }}>
                                Image not found
                            </div>
                        )}
                    </div>
                    <div className="card-right">
                        <div className="card-details">
                            <h2>{film.title}</h2>
                            <p><strong>Director:</strong> {film.director}</p>
                            <p><strong>Year:</strong> {film.year}</p>
                            <p><strong>Content:</strong> {film.content}</p>
                            <p><strong>Genre:</strong> {film.genre}</p>
                            <p><strong>Duration:</strong> {duration}</p>
                            <p><strong>Watched:</strong> {film.watched ? 'Yes' : 'No'}</p>
                            <p><strong>Rating:</strong> {film.rating !== null ? parseFloat(film.rating).toFixed(1) : 'None'}</p>

                            <p><strong>Priority:</strong> {film.priority}</p>
                            <p><strong>Favorite:</strong> {film.favourite ? 'Yes' : 'No'}</p>
                            <p><strong>Marked:</strong> {film.marked ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div>
            <aside className="content">
                <div className="card-container">
                    {createCard()}
                </div>
            </aside>
        </div>
    );
};

export default Cards;
//     const ensureUniqueKeys = (films) => {
//         const uniqueKeys = new Set();
//         return films.map((film, index) => {
//             let key = `${film.title}-${index}`;
//             while (uniqueKeys.has(key)) {
//                 key = `${film.title}-${index}-${Date.now()}`; // Append timestamp if key already exists
//             }
//             uniqueKeys.add(key);
//             return { ...film, key };
//         });
//     };

//     const createCard = () => {
//         const uniqueFilms = ensureUniqueKeys(films); // Ensure unique keys
    
//         return uniqueFilms.map((film, key) => {
//             const durationHours = parseInt(film.durationHours, 10);
//             const durationMinutes = parseInt(film.durationMinutes, 10);
//             const duration = `${durationHours}h ${durationMinutes}m`;
    
//             adjustPageExtension();
//             return (
//                 <div
//                     key={film.key}
//                     className={`card ${markedCards.includes(film) ? 'marked' : ''}`}
//                     onClick={() => handleCardClick(key)}
//                 >
//                     <div className="card-left">
//                         <img
//                             src={film.imageUrl}
//                             alt={film.title}
//                             onError={() => handleImageError(key)}
//                         />
//                         {hasImageError[key] && (
//                             <div className="error-msg" style={{ color: 'red' }}>
//                                 Image not found
//                             </div>
//                         )}
//                     </div>
//                     <div className="card-right">
//                         <div className="card-details">
//                             <h2>{film.title}</h2>
//                             <p><strong>Director:</strong> {film.director}</p>
//                             <p><strong>Year:</strong> {film.year}</p>
//                             <p><strong>Content:</strong> {film.content}</p>
//                             <p><strong>Genre:</strong> {film.genre}</p>
//                             <p><strong>Duration:</strong> {duration}</p>
//                             <p><strong>Watched:</strong> {film.watched ? 'Yes' : 'No'}</p>
//                             <p><strong>Rating:</strong> {film.rating !== null ? parseFloat(film.rating).toFixed(1) : 'None'}</p>
//                             <p><strong>Priority:</strong> {film.priority}</p>
//                             <p><strong>Favorite:</strong> {film.favourite ? 'Yes' : 'No'}</p>
//                             <p><strong>Marked:</strong> {film.marked ? 'Yes' : 'No'}</p>
//                         </div>
//                     </div>
//                 </div>
//             );
//         });
//     };

//     return (
//         <div>
//             <aside className="content">
//                 <div className="card-container">
//                     {createCard()}
//                 </div>
//             </aside>
//         </div>
//     );
// };

// export default Cards;







