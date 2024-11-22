import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Calendar from "react-calendar";
import { useRouter } from 'next/router';

const testTimes = ['7:00-9:00 (AM)', '9:00-12:00 (AM)', '12:00-4:30 (PM)', '4:30 and above (PM)'];

const TestDates = () => {
    const [selectedTimes, setSelectedTimes] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const router = useRouter();
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    // Pobierz dostępność użytkownika z serwera przy pierwszym renderowaniu
    useEffect(() => {
        const fetchUserAvailability = async () => {
            const userData = localStorage.getItem('userData');
            if (!userData) {
                alert('User data not found in storage');
                return;
            }

            const { licenseNumber } = JSON.parse(userData);

            try {
                const response = await fetch(`${serverUrl}/api/getAvailability`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ licenseNumber }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setSelectedTimes(data.availability || {});
                } else {
                    console.error('Failed to fetch availability');
                }
            } catch (error) {
                console.error('Error fetching availability:', error);
            }
        };

        fetchUserAvailability();
    }, []);

    const handleDaySelect = (value) => {
        const formattedDate = value.toLocaleDateString('en-CA');
        setSelectedDay(formattedDate);
    };

    const handleTimeSelect = (time) => {
        setSelectedTimes((prev) => {
            const updatedTimes = prev[selectedDay]?.includes(time)
                ? prev[selectedDay].filter((selectedTime) => selectedTime !== time)
                : [...(prev[selectedDay] || []), time];

            return updatedTimes.length > 0
                ? { ...prev, [selectedDay]: updatedTimes }
                : Object.fromEntries(Object.entries(prev).filter(([key]) => key !== selectedDay));
        });
    };

    const handleSaveAvailability = async () => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            alert('User data not found in storage');
            return;
        }

        const { licenseNumber } = JSON.parse(userData);

        try {
            const response = await fetch(`${serverUrl}/api/updateAvailability`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ licenseNumber, availability: selectedTimes }),
            });

            if (response.ok) {
                console.log('Availability saved successfully');
                router.push('/home');
            } else {
                console.error('Failed to save availability');
                alert('Error: Failed to save availability');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: An error occurred. Please try again.');
        }
    };

    return (
        <div className="test-dates">
            <h1>Select a Test Date</h1>
            <Calendar
                minDate={new Date()}
                onClickDay={handleDaySelect}
                value={selectedDay ? new Date(selectedDay) : null}
                tileClassName={({ date }) => {
                    const formattedDate = date.toLocaleDateString('en-CA');
                    if (selectedDay === formattedDate) return 'selected-day';
                    if (selectedTimes[formattedDate]) return 'marked-day';
                    return '';
                }}
            />
            {selectedDay && (
                <>
                    <h2>Choose available times for {selectedDay}</h2>
                    <div className="times-list">
                        {testTimes.map((time, idx) => (
                            <label key={idx} className={`time-item ${selectedTimes[selectedDay]?.includes(time) ? 'selected' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedTimes[selectedDay]?.includes(time) || false}
                                    onChange={() => handleTimeSelect(time)}
                                />
                                {time}
                            </label>
                        ))}
                    </div>
                </>
            )}
            <div className="footer">
                {!selectedDay ? (
                    <div className="skip-link" onClick={() => router.push('/home')}>Skip for now</div>
                ) : (
                    <button
                        onClick={handleSaveAvailability}
                        disabled={!selectedDay || Object.keys(selectedTimes).length === 0}
                        className={`continue-button ${!selectedDay || Object.keys(selectedTimes).length === 0 ? 'inactive' : ''}`}
                    >
                        Save Availability
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(TestDates), { ssr: false });