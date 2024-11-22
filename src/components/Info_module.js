// pages/info.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const InfoScreen = () => {
    const [selectedTestType, setSelectedTestType] = useState(null);
    const [selectedSubTest, setSelectedSubTest] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchTestType = async () => {
            try {
                const userData = localStorage.getItem('userData');
                if (userData) {
                    const parsedData = JSON.parse(userData);
                    console.log('Data in localStorage:', parsedData); // Logowanie danych dla debugowania
                    setSelectedTestType(parsedData.selectedTestId);
                    setSelectedSubTest(parsedData.selectedSubTest);
                } else {
                    alert("Error: User data not found in storage");
                }
            } catch (error) {
                console.error("Error fetching test type from localStorage:", error);
            }
        };
        fetchTestType();
    }, []);

    const handleContinue = () => {
        if (selectedTestType === 3 && selectedSubTest === 'C1M') {
            // Przekierowanie na stronę VehicleInformation, jeśli warunki są spełnione
            router.push('/vehicle');
        } else {
            router.push('/license-details');
        }
    };

    const renderInfoText = () => {
        switch (selectedTestType) {
            case 1: // Motorcycles
                return null;
            case 2: // Motorcycles
                return (
                    <>
                        <h2 className="title">Vehicle information - A1 light bike mod 1 test</h2>
                        <div className="info-container">
                            <div className="info-title">
                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                <span> Additional information for motorcycle tests</span>
                            </div>
                            <p className="info-text">
                                • You may book both modules at the same time but you must pass your module 1 test before you can take the module 2 test<br />
                                • Both modules must be passed before the theory test expires (except for progressive access tests)<br />
                                • You must take your module 1 test certificate to the test centre when you attend your module 2 test<br />
                                <br />
                                Further rules for progressive access tests:<br />
                                • No theory test is required<br />
                                • Module 2 must be passed within 6 months of passing module 1
                            </p>
                        </div>
                    </>
                );
            case 3: // Lorries
                return (
                    <>
                        <h2 className="title">Vehicle information - Medium and Large Lorry Test</h2>
                        <div className="info-container">
                            <div className="info-title">
                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                <span> Additional information for lorry tests</span>
                            </div>
                            <p className="info-text">
                                • Ensure your vehicle meets the required specifications before arriving at the test center<br />
                                • You must have a valid certificate for the lorry's maintenance and safety checks<br />
                                • A fully loaded lorry may be required for the off-road portion of the test<br />
                                <br />
                                Specific guidelines for articulated lorry tests:<br />
                                • Make sure both lorry and trailer are in proper working condition<br />
                                • Ensure the coupling and uncoupling procedures are practiced thoroughly
                            </p>
                        </div>
                    </>
                );
            case 4: // Buses and coaches
                return (
                    <>
                        <h2 className="title">Vehicle information - Bus and Coach Test</h2>
                        <div className="info-container">
                            <div className="info-title">
                                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                                <span> Additional information for bus and coach tests</span>
                            </div>
                            <p className="info-text">
                                • Buses must have proper signage and seating arrangements as required by law<br />
                                • Emergency exits should be clearly marked and functional<br />
                                • Familiarize yourself with passenger safety protocols, including assisting passengers in wheelchairs<br />
                                <br />
                                Specific requirements for full-size buses:<br />
                                • Ensure the bus has functional stop buttons and door mechanisms<br />
                                • Be prepared for off-road and on-road test portions that simulate real passenger transport scenarios
                            </p>
                        </div>
                    </>
                );
            default:
                return <p className="info-text">No information available for the selected test type.</p>;
        }
    };

    return (
        <div className="info-screen">
            {renderInfoText()}
            <div className="continue-container">
                <button className="button button-active" onClick={handleContinue}>
                    Continue
                    <div className="drag-handle">
                        <span className="arrow">&rarr;</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default InfoScreen;
