import React from 'react';


function Footer({ deSelect, onDelete, sortButton, adjustPageExtension, toggleAddSite, markedCards, handleEdit }) {

  const optionsToggle = () => {
    const optionsContent = document.querySelector('.options-content');
    optionsContent.classList.toggle('show');
    adjustPageExtension()

  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value.trim();
    filterCards(inputValue);
  };

  const filterCards = (inputValue) => {
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

  return (
    <div id="page-extension">
      <footer className='footer'>

        <div className="options-dropdown">
          <div className="options-content">
            <input type="text" className="search-input" id="temp" placeholder="Search..." onChange={handleInputChange} />
          </div>

          <div className="footer-container">
            <button className="delete-button" onClick={onDelete}>DELETE</button>
            <button className="sort-button" onClick={sortButton}>SORT</button>
            <button className="options-toggle" onClick={optionsToggle}>SEARCH</button>

            {markedCards.length === 1 ? (
              <button className="edit" onClick={handleEdit}>EDIT</button>
            ) : (
              markedCards.length > 1 ? (
                <button className="new-button" onClick={deSelect}> DESELECT CARDS</button>
              ) : (
                <button className="add-button" onClick={toggleAddSite}>ADD</button>
              )
            )}

          </div>
        </div>
      </footer >
    </div >
  );
}

export default Footer;
