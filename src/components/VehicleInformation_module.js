import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const VehicleInformation = () => {
    const [vehicleLength, setVehicleLength] = useState('');
    const [vehicleWidth, setVehicleWidth] = useState('');
    const [vehicleHeight, setVehicleHeight] = useState('');
    const router = useRouter();

    const validateInput = (value, min, max) => {
        const numericValue = parseFloat(value);
        return numericValue >= min && numericValue <= max;
    };

    const isFormComplete =
        validateInput(vehicleLength, 5, 14) &&
        validateInput(vehicleWidth, 0, 5) &&
        validateInput(vehicleHeight, 0, 5);

    const handleContinue = async () => {
        if (!isFormComplete) {
            alert('Validation Error: Please enter valid values for all fields.');
            return;
        }

        try {
            const userData = localStorage.getItem('userData');
            if (!userData) {
                alert('Error: User data not found in storage');
                return;
            }

            const parsedUserData = JSON.parse(userData);
            const updatedUserData = {
                ...parsedUserData,
                vehicleData: {
                    vehicleLength,
                    vehicleWidth,
                    vehicleHeight,
                },
            };
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            router.push('/license-details'); // Navigate to the desired screen
        } catch (error) {
            alert('Error: Failed to save vehicle information.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Vehicle Information - C1: Medium lorry (off-road) test</h1>

            <div className="inputContainer">
                <label className="label">Vehicle length (5m - 14m)</label>
                <input
                    type="number"
                    className="input"
                    value={vehicleLength}
                    onChange={(e) => setVehicleLength(e.target.value)}
                    placeholder="Enter vehicle length"
                />
            </div>

            <div className="inputContainer">
                <label className="label">Vehicle width (0m - 5m)</label>
                <input
                    type="number"
                    className="input"
                    value={vehicleWidth}
                    onChange={(e) => setVehicleWidth(e.target.value)}
                    placeholder="Enter vehicle width"
                />
            </div>

            <div className="inputContainer">
                <label className="label">Vehicle height (0m - 5m)</label>
                <input
                    type="number"
                    className="input"
                    value={vehicleHeight}
                    onChange={(e) => setVehicleHeight(e.target.value)}
                    placeholder="Enter vehicle height"
                />
            </div>

            <div className="continueContainer">
                {isFormComplete ? (
                    <button className="button buttonActive" onClick={handleContinue}>
                        Continue
                        <div className="dragHandle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </button>
                ) : (
                    <button className="button buttonDisabled" disabled>
                        Fill to continue
                        <div className="dragHandleDisabled">
                            <span className="arrowDisabled">&rarr;</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default VehicleInformation;
