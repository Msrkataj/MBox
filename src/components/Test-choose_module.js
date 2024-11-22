import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const TestCentresChoose = () => {
    const [testCentres, setTestCentres] = useState([]);
    const [filteredCentres, setFilteredCentres] = useState([]);
    const [selectedCentres, setSelectedCentres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetails, setShowDetails] = useState({});
    const router = useRouter();
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    // Pobierz ośrodki testowe z serwera i ustaw zapisane wybrane ośrodki
    useEffect(() => {
        const fetchTestCentres = async () => {
            try {
                // Pobieranie wszystkich ośrodków testowych
                const centresResponse = await fetch(`${serverUrl}/api/testCentres`);
                const centresData = await centresResponse.json();
                setTestCentres(centresData);
                setFilteredCentres(centresData);

                // Pobranie wybranych ośrodków dla użytkownika z bazy danych
                const licenseData = localStorage.getItem('userData');
                if (!licenseData) {
                    alert('License number not found in localStorage');
                    return;
                }
                const { licenseNumber } = JSON.parse(licenseData);

                const userResponse = await fetch(`${serverUrl}/api/getUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ licenseNumber }),
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setSelectedCentres(userData.selectedCentres || []);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching test centres or user data:', error);
                alert('Error: Failed to fetch data');
            }
        };

        fetchTestCentres();
    }, []);

    // Filtrowanie ośrodków na podstawie zapytania wyszukiwania
    useEffect(() => {
        const filtered = testCentres.filter((centre) => {
            const name = centre.name || '';
            const postalCode = centre.postalCode || '';
            return (
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                postalCode.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredCentres(filtered);
    }, [searchQuery, testCentres]);

    // Zaznacz/odznacz wybrany ośrodek
    const handleSelect = (centre) => {
        setSelectedCentres((prev) =>
            prev.includes(centre) ? prev.filter(item => item !== centre) : [...prev, centre]
        );
    };

    // Przełącz widoczność szczegółów ośrodka
    const toggleDetails = (index) => {
        setShowDetails(prev => ({ ...prev, [index]: !prev[index] }));
    };

    // Zapisz wybrane ośrodki i przejdź do kolejnej strony
    const handleContinue = async () => {
        // Pobierz dane użytkownika z localStorage
        const licenseData = localStorage.getItem('userData');
        if (!licenseData) {
            alert('License number not found in localStorage');
            return;
        }

        const parsedLicenseData = JSON.parse(licenseData);
        const { licenseNumber } = parsedLicenseData;

        // Zapisz wybrane ośrodki w localStorage i serwerze
        const updatedUserData = {
            ...parsedLicenseData,
            selectedCentres,
        };

        localStorage.setItem('userData', JSON.stringify(updatedUserData));

        try {
            const response = await fetch(`${serverUrl}/api/updateUserCentres`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseNumber, selectedCentres }),
            });

            if (response.ok) {
                console.log('Selected centres saved successfully');
                router.push('/home');
            } else {
                console.error('Failed to save selected centres');
            }
        } catch (error) {
            console.error('Error saving selected centres:', error);
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
                        Save
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default dynamic(() => Promise.resolve(TestCentresChoose), { ssr: false });
