import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const TestCentres = () => {
    const [testCentres, setTestCentres] = useState([]);
    const [filteredCentres, setFilteredCentres] = useState([]);
    const [selectedCentres, setSelectedCentres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetails, setShowDetails] = useState({});
    const router = useRouter();
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    // Pobieranie ośrodków testowych z serwera
    useEffect(() => {
        const fetchTestCentres = async () => {
            try {
                const response = await fetch(`${serverUrl}/api/testCentres`);
                const data = await response.json();
                setTestCentres(data);
                setFilteredCentres(data); // Ustawienie początkowego filtrowania
            } catch (error) {
                console.error('Błąd podczas pobierania ośrodków testowych:', error);
                alert('Error: Failed to fetch test centres');
            }
        };

        fetchTestCentres();
    }, []);

    // Filtrowanie ośrodków na podstawie zapytania wyszukiwania
    useEffect(() => {
        const filtered = testCentres.filter(centre => {
            const name = centre.name || '';
            const postalCode = centre.postalCode || '';
            return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                postalCode.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredCentres(filtered);
    }, [searchQuery, testCentres]);

    // Zaznaczanie/odznaczanie wybranych ośrodków
    const handleSelect = (centre) => {
        setSelectedCentres((prev) =>
            prev.includes(centre) ? prev.filter(item => item !== centre) : [...prev, centre]
        );
    };

    // Przełączanie szczegółów ośrodka
    const toggleDetails = (index) => {
        setShowDetails(prev => ({ ...prev, [index]: !prev[index] }));
    };

    // Funkcja do kontynuacji po wyborze ośrodków
    const handleContinue = async () => {
        try {
            // Pobierz dane użytkownika z localStorage
            const userData = localStorage.getItem('userData');

            if (!userData) {
                alert('User data not found in storage');
                return;
            }

            const parsedUserData = JSON.parse(userData);
            const { licenseNumber } = parsedUserData;

            // Aktualizacja danych użytkownika z wybranymi ośrodkami
            const updatedUserData = {
                ...parsedUserData,
                selectedCentres,
            };

            // Zapisanie zaktualizowanych danych do localStorage
            localStorage.setItem('userData', JSON.stringify(updatedUserData));

            // Wysyłanie wybranych ośrodków do serwera
            const response = await fetch(`${serverUrl}/api/updateUserCentres`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseNumber, selectedCentres }),
            });

            if (response.ok) {
                console.log('Selected centres saved successfully');
                router.push('/test-dates');
            } else {
                console.error('Failed to save selected centres');
                alert('Error: Failed to save selected centres');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: An error occurred. Please try again.');
        }
    };

    return (
        <div className="test-centres">
            <h1>Test centres</h1>
            <p className="subtitle">Choose your test centres</p>
            <div className="test-centres__search">
                <input
                    className="search-box"
                    placeholder="Search test centres or type post code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Image
                    src="/assets/search.png"
                    alt="Search"
                    width={20}
                    height={20}
                    className="search-icon"
                />
            </div>
            <div className="centres-list">
                {filteredCentres.map((centre, index) => (
                    <div key={index} className="centre-item">
                        <label className={`centre-label ${selectedCentres.includes(centre.name) ? 'selected' : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedCentres.includes(centre.name)}
                                onChange={() => handleSelect(centre.name)}
                            />
                            {centre.name}
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="location-icon"
                                onClick={() => toggleDetails(index)}
                            />
                        </label>
                        {showDetails[index] && (
                            <div className="centre-details">
                                <p>{centre.address}</p>
                                <p>{centre.postalCode}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedCentres.length > 0 && (
                <div className="continue-button-container active">
                    <div className="continue-button" onClick={handleContinue}>
                        Continue
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default dynamic(() => Promise.resolve(TestCentres), { ssr: false });
