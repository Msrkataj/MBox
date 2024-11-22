import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from "next/router";

const testTypes = [
    { id: 1, name: 'Car (manual and automatic)', icon: '/assets/sports-car.png' },
    { id: 2, name: 'Motorcycles', icon: '/assets/motorcycle-icon.png' },
    { id: 3, name: 'Lorries', icon: '/assets/lorry.png' },
    { id: 4, name: 'Buses and coaches', icon: '/assets/bus.png' },
];

const subTestOptions = {
    2: [
        { label: 'A1', value: 'A1' },
        { label: 'A2', value: 'A2' },
        { label: 'AM', value: 'AM' },
        { label: 'Full A', value: 'Full A' },
    ],
    3: [
        { label: 'C1: Medium lorry (off-road)', value: 'C1M' },
        { label: 'C1: Medium lorry (on-road)', value: 'C1' },
        { label: 'C1E: Medium lorry and trailer (off-road)', value: 'C1EM' },
        { label: 'C1E: Medium lorry and trailer (on-road)', value: 'C1E' },
        { label: 'C: Large lorry (off-road)', value: 'CM' },
        { label: 'C: Large lorry (on-road)', value: 'C' },
        { label: 'CE: Large lorry and trailer (off-road)', value: 'CEM' },
        { label: 'CE: Large lorry and trailer (on-road)', value: 'CE' },
    ],
    4: [
        { label: 'D1: Minibus (off-road)', value: 'D1M' },
        { label: 'D1: Minibus (on-road)', value: 'D1' },
        { label: 'D1E: Minibus and trailer (off-road)', value: 'D1EM' },
        { label: 'D1E: Minibus and trailer (on-road)', value: 'D1E' },
        { label: 'D: Bus (off-road)', value: 'DM' },
        { label: 'D: Bus (on-road)', value: 'D' },
        { label: 'DE: Bus and trailer (off-road)', value: 'DEM' },
        { label: 'DE: Bus and trailer (on-road)', value: 'DE' },
    ],
};

const ChooseModule = () => {
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedSubTest, setSelectedSubTest] = useState('');
    const router = useRouter();

    const handleSelect = (test) => {
        setSelectedTest(test);
        setSelectedSubTest(''); // Resetuj podtyp przy zmianie głównego typu testu
    };

    const handleContinue = async () => {
        try {
            let userData = localStorage.getItem('userData');
            if (!userData) {
                alert('Error: User data not found in storage');
                return;
            }

            let parsedData = JSON.parse(userData);
            parsedData = {
                ...parsedData,
                selectedTestId: selectedTest.id,
                selectedSubTest: selectedSubTest,
            };

            // Zapisz zaktualizowane dane do `localStorage`
            localStorage.setItem('userData', JSON.stringify(parsedData));

            // Nawigacja do następnego ekranu
            if (selectedTest.id === 1) {
                router.push('/license-details'); // Jeśli wybrano Car, przejdź do LicenseDetails
            } else {
                router.push('/info'); // W przeciwnym razie przejdź do InfoScreen
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: An error occurred. Please try again.');
        }
    };

    // Sprawdź, czy formularz jest kompletny - jeśli wybrano test i podtyp (jeśli dotyczy)
    const isFormComplete = selectedTest && (selectedTest.id === 1 || selectedSubTest);


    return (
        <div className="test-selection">
            <h1>Choose type of test</h1>
            <div className="test-selection__options">
                {testTypes.map((test) => (
                    <div
                        key={test.id}
                        className={`test-selection__option ${selectedTest?.id === test.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(test)}
                    >
                        <Image src={test.icon} alt={test.name} width={24} height={24} />
                        <span>{test.name}</span>
                    </div>
                ))}
            </div>

            {/* Komponent wyboru podtypu testu */}
            {selectedTest && subTestOptions[selectedTest.id] && (
                <div className="test-selection__subtest">
                    <label>Choose specific test type:</label>
                    <select
                        value={selectedSubTest}
                        onChange={(e) => setSelectedSubTest(e.target.value)}
                    >
                        <option value="">Select an option</option>
                        {subTestOptions[selectedTest.id].map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="test-selection__continue">
                {isFormComplete ? (
                    <div className="test-selection__button active" onClick={handleContinue}>
                        Continue
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </div>
                ) : (
                    <button className="test-selection__button disabled" disabled>
                        Choose to continue
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChooseModule;
