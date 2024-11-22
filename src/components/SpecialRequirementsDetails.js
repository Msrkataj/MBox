import React, { useState, useEffect } from 'react';

const SpecialRequirementsDetails = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [detailedInfo, setDetailedInfo] = useState('');

    useEffect(() => {
        // Symulowane pobranie danych
        const fetchSelectedOptions = async () => {
            try {
                const userData = localStorage.getItem('userData');
                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    const { specialNeedsOptions } = parsedUserData;
                    const selected = Object.keys(specialNeedsOptions).filter(key => specialNeedsOptions[key]);
                    setSelectedOptions(selected);
                }
            } catch (error) {
                alert('Błąd podczas ładowania Twoich wyborów.');
            }
        };

        fetchSelectedOptions();
    }, []);

    const handleSubmit = async () => {
        try {
            const userData = localStorage.getItem('userData');
            if (!userData) {
                alert('Błąd: Nie znaleziono danych użytkownika w pamięci');
                return;
            }

            const parsedUserData = JSON.parse(userData);
            const updatedUserData = {
                ...parsedUserData,
                detailedSpecialNeedsInfo: detailedInfo,
            };

            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            // Przekierowanie do kolejnej strony po zapisaniu informacji
            window.location.href = '/login';
        } catch (error) {
            alert('Błąd podczas zapisywania informacji. Spróbuj ponownie.');
        }
    };

    return (
        <div className="special-requirements-container">
            <h1 className="title">Further information about your special requirements:</h1>
            <p className="subtitle">We need to know a little more about some of the special requirements that you have.</p>

            {selectedOptions.length > 0 ? (
                <>
                    <h2 className="sectionTitle">Special Requirements Selected:</h2>
                    <div className="selectedOptionsContainer">
                        {selectedOptions.map((option, index) => (
                            <p key={index} className="selectedOptionText">
                                • {getSpecialNeedLabel(option)}
                            </p>
                        ))}
                    </div>

                    <label className="label">Please provide more information about the special requirements above (max 300 characters, including spaces):</label>
                    <textarea
                        className="textArea"
                        maxLength={300}
                        value={detailedInfo}
                        onChange={(e) => setDetailedInfo(e.target.value)}
                    ></textarea>

                    <div className="continueContainer">
                        <button className={`license-details__button ${detailedInfo ? 'active' : 'disabled'}`} onClick={handleSubmit} disabled={!detailedInfo}>
                            Submit
                            <div className="drag-handle">
                                <span className="arrow">&rarr;</span>
                            </div>
                        </button>
                    </div>
                </>
            ) : (
                <p className="noSelectionText">No special requirements selected.</p>
            )}
        </div>
    );
};

const getSpecialNeedLabel = (option) => {
    const labels = {
        welshExaminer: 'Welsh Speaking Examiner',
        alternateName: 'Different Name Preference',
        pregnant: 'Heavily Pregnant',
        movementRestriction: 'Movement Restriction',
        dyslexia: 'Dyslexia',
        epilepsy: 'Epilepsy',
        missingLimbs: 'Missing Limbs',
        paraplegia: 'Paraplegia',
        specialLearning: 'Special Learning Needs',
        nonRestriction: 'No Movement Restriction',
        hardOfHearing: 'Hard of Hearing',
        deaf: 'Profoundly Deaf',
    };
    return labels[option] || '';
};

export default SpecialRequirementsDetails;
