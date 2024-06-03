import React from 'react';

function Settings() {

    const handleClose = () => {
        const settingsOverlay = document.getElementById('settings');
        settingsOverlay.classList.remove('show');
    };

    return (
        <div id="settings" className="settings">
            <div className="settings-content">
                <h2>Settings</h2>
                <p>Search field is used for all sorting, for example: </p>
                <p>Genra, Year, Title, Directors, Ratings, Watched. </p>

                {/* Add your form elements here */}
                <form id="settings-form">
                    
                    <p>For best user experience you should use images from or similar to IMDB's posters.</p>

                    <p>If you delete all the cards, a small set of defualt cards are created. </p>
                </form>
                <button className="close-button" onClick={handleClose}>CLOSE</button>
            </div>
        </div>
    );
}

export default Settings;
