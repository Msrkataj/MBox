// components/ManualBooking.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const bookingData = [
    {
        id: 1,
        location: 'Hither Green (London)',
        date: 'Friday, May 3, 2024, 9:00 AM',
    },
    {
        id: 2,
        location: 'Wood Green (London)',
        date: 'Monday, May 6, 2024, 11:00 AM',
    },
    {
        id: 3,
        location: 'Wood Green (London)',
        date: 'Monday, May 6, 2024, 2:30 PM',
    },
];

const ManualBooking = () => {
    return (
        <div className="manual-booking">
            <div className="manual-booking__header">
                <Link href="/home">
                    <button className="manual-booking__back-button">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </Link>
                <div className="manual-booking__header-titles">
                    <h1 className="manual-booking__title">Manual booking</h1>
                    <p className="manual-booking__subtitle">Dates for you</p>
                </div>
            </div>
            <div className="manual-booking__list">
                {bookingData.map((booking) => (
                    <div key={booking.id} className="manual-booking__item">
                        <div className="manual-booking__location">
                            <span>{booking.location}</span>
                            <FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
                        </div>
                        <p className="manual-booking__found">Test centre</p>
                        <p className="manual-booking__date">{booking.date}</p>
                        <p className="manual-booking__found">Date</p>
                        <button className="manual-booking__button">Book now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(ManualBooking), { ssr: false });
