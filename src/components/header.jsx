import React from 'react';

function Header({ toggleSettings }) {
    return (
        <header className="header">
            <button className="settings-button" onClick={toggleSettings}>
                <img src="src/assets/settings.png" alt="Settings" />
            </button>
        </header>
    );
}

export default Header;