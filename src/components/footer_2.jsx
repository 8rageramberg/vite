import React, { useEffect } from 'react';



function Footer({ onAdd, onBack, onDelete, adjustPageExtension, showBackButton }) {


    useEffect(() => {
        adjustPageExtension();
    }, [adjustPageExtension]);


    const dumbCheck = (event) => {
        console.log("FUCKYOU")
    };
    

    return (
        <div id="page-extension">
            <footer className="footer">
                <div className="footer-container">
                    <div className="end-buttons">
                        {showBackButton ? (
                            <button id="back-button" onClick={onBack}>Back</button>
                        ) : (
                            <button id="delete-button" onClick={onDelete}>Delete Draft</button>
                        )}

                        <button form="addFolderForm" type="submit">ADD</button>



                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
