import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';


import Header from './components/header';
import Cards from './components/cards';
import Footer_1 from './components/footer_1';
import Footer_2 from './components/footer_2';
import Title from './components/title';
import Settings from './components/settings';
import AddSite from './components/addSite';


function App() {
  const [showAddSite, setShowAddSite] = useState(false);
  const [markedCards, setMarkedCards] = useState([]);

  const onDelete = () => {
    const storedFilms = JSON.parse(localStorage.getItem('films')) || [];
    const updatedFilms = storedFilms.filter(film => !film.marked);
    localStorage.setItem('films', JSON.stringify(updatedFilms));
    window.location.reload(); // Refresh the page to reflect the changes
  };

  // Adjust the page extension height initially
  useEffect(() => {
    adjustPageExtension();
    window.addEventListener('resize', adjustPageExtension);
  }, []);

  const handleEdit = () => {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const FilmsMarkedYes = films.filter(film => film.marked);

    // Assuming you want to set the key of the first marked film
    if (FilmsMarkedYes.length > 0) {
      FilmsMarkedYes[0].key = FilmsMarkedYes[0].title; // Or any unique key logic you want
      localStorage.setItem('markedCard', JSON.stringify(FilmsMarkedYes[0]));
    }
    toggleButton();
    toggleAddSite();
  };

  const [showBackButton, setShowBackButton] = useState(true);

  const toggleButton = () => {
    setShowBackButton(prevShowBackButton => !prevShowBackButton);
  };


  function adjustPageExtension() {
    const footerHeight = document.querySelector('.footer').offsetHeight + 16;
    document.getElementById('page-extension').style.height = footerHeight + 'px';
  }

  const toggleSettings = () => {
    const settingsOverlay = document.getElementById('settings');
    settingsOverlay.classList.toggle('show');
  };

  const toggleAddSite = () => {
    setShowAddSite(prevState => !prevState);
  };

  const onBack = () => {
    setShowAddSite(false);
  };

  const deSelect = () => {
    alert('You need to remove the selected cards to add or edit');
  };

  const genresList = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary",
    "Drama", "Family", "Fantasy", "History", "Horror", "Musical", "Mystery", "Romance",
    "Sci-Fi", "Sport", "Thriller", "War", "Western", "Superhero", "Disaster", "Anime",
    "Stop Motion", "Dark Comedy", "Romantic Comedy", "Historical", "Noir"
  ];

  return (
    <div className="root">
      <Title />
      <Header toggleSettings={toggleSettings} />
      <Settings />
      {showAddSite ?
        <AddSite /> :
        <Cards adjustPageExtension={adjustPageExtension} markedCards={markedCards} setMarkedCards={setMarkedCards} />}

      {showAddSite ?
        <Footer_2 onBack={onBack} onAdd={onBack} onDelete={onDelete} adjustPageExtension={adjustPageExtension} showBackButton={showBackButton}
          toggleButton={toggleButton} /> :
        <Footer_1 deSelect={deSelect} markedCards={markedCards} onDelete={onDelete} sortButton={console.log("sorting...")} adjustPageExtension={adjustPageExtension} toggleAddSite={toggleAddSite} handleEdit={handleEdit} />}
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

