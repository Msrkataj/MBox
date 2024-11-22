import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Calendar from "react-calendar";
import { useRouter } from 'next/router';

const testTimes = ['7:00-9:00 (AM)', '9:00-12:00 (AM)', '12:00-4:30 (PM)', '4:30 and above (PM)'];

const TestDates = () => {
    const [selectedDays, setSelectedDays] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    const router = useRouter();
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    useEffect(() => {
        const fetchAvailability = async () => {
            const userData = localStorage.getItem('userData');
            if (!userData) {
                alert('User data not found in storage');
                return;
            }

            const { licenseNumber } = JSON.parse(userData);

            try {
                const response = await fetch(`${serverUrl}/api/getUser`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ licenseNumber }),
                });

                if (response.ok) {
                    const user = await response.json();
                    const userAvailability = user.availability || {}; // Sprawdzamy, czy istnieje availability
                    setSelectedDays(userAvailability);
                } else {
                    console.error('Failed to fetch user availability');
                }
            } catch (error) {
                console.error('Error fetching availability:', error);
            }
        };

        fetchAvailability();
    }, []);

    const toggleDaySelection = (date) => {
        const formattedDate = date.toLocaleDateString('en-CA');
        setSelectedDay(formattedDate);

        setSelectedDays((prev) => ({
            ...prev,
            [formattedDate]: prev[formattedDate] || [], // Jeśli dzień nie istnieje, ustawiamy pustą tablicę
        }));
    };

    const handleTimeSelect = (time) => {
        if (!selectedDay) return;

        setSelectedDays((prev) => {
            const updatedTimes = prev[selectedDay]?.includes(time)
                ? prev[selectedDay].filter(selectedTime => selectedTime !== time)
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
            const response = await fetch(`${serverUrl}/api/updateUserAvailability`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ licenseNumber, availability: selectedDays }),
            });

            if (response.ok) {
                console.log('Availability saved successfully');
                router.push('/home');
            } else {
                console.error('Failed to save availability');
            }
        } catch (error) {
            console.error('Error saving availability:', error);
        }
    };

    return (
        <div className="test-dates">
            <h1>Select Dates and Times</h1>
            <Calendar
                minDate={new Date()}
                onClickDay={toggleDaySelection}
                tileClassName={({ date }) => {
                    const formattedDate = date.toLocaleDateString('en-CA');
                    return selectedDays[formattedDate] ? 'marked-day' : '';
                }}
                value={selectedDay ? new Date(selectedDay) : null}
            />

            {selectedDay && (
                <>
                    <h2>Choose available times for {selectedDay}</h2>
                    <div className="times-list">
                        {testTimes.map((time, idx) => (
                            <label key={idx} className={`time-item ${selectedDays[selectedDay]?.includes(time) ? 'selected' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedDays[selectedDay]?.includes(time) || false}
                                    onChange={() => handleTimeSelect(time)}
                                />
                                {time}
                            </label>
                        ))}
                    </div>
                </>
            )}
            <div className="footer">
                <button
                    onClick={handleSaveAvailability}
                    disabled={Object.keys(selectedDays).length === 0}
                    className={`continue-button ${Object.keys(selectedDays).length === 0 ? 'inactive' : ''}`}
                >
                    Save Availability
                </button>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(TestDates), { ssr: false });
