import React, { useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from "next/dynamic";

const offers = [
    {
        id: 1,
        name: 'Premium',
        price: '14,99 GBP',
        features: [
            'Automatic test date booking',
            'Push notification and email information about the new dates',
            'Choose the perfect date that suits you',
        ],
        isPremium: true,
    },
    {
        id: 2,
        name: 'Free',
        price: '0 GBP',
        features: [
            'Manual bookings only',
            'No notification of new dates',
            'Slower refresh of appointment dates',
            'No guarantee of booking an appointment',
        ],
        isPremium: false,
    },
];

const OfferSelection = () => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const router = useRouter();
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    const handleSelect = (id) => {
        setSelectedOffer(id);
    };

    const handleContinue = async () => {
        const selectedOfferData = offers.find((offer) => offer.id === selectedOffer);
        const isPremium = selectedOfferData.isPremium;

        try {
            // Pobierz dane użytkownika z localStorage
            const licenseData = localStorage.getItem('userData');
            if (!licenseData) {
                alert('User data not found in localStorage');
                return;
            }

            const parsedLicenseData = JSON.parse(licenseData);
            const { licenseNumber } = parsedLicenseData;

            // Wyślij zaktualizowane dane użytkownika do serwera
            const response = await fetch(`${serverUrl}/api/updateUserPremiumStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseNumber, isPremium }),
            });

            if (response.ok) {
                console.log('User premium status updated successfully');
                localStorage.setItem(
                    'userData',
                    JSON.stringify({ ...parsedLicenseData, isPremium })
                );

                // Przekierowanie w zależności od wybranej oferty
                if (isPremium) {
                    router.push('/premium');
                } else {
                    router.push('/');
                }
            } else {
                console.error('Failed to update user premium status');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="offer-selection">
            <div className="offer-selection__image">
                <Image
                    src="/assets/driver-rafiki-2.png"
                    alt="Driver illustration"
                    width={150}
                    height={150}
                    layout="responsive"
                />
            </div>
            <p className="subtitle">Increase your chances</p>
            <h1>Choose offer</h1>
            <div className="offer-selection__options">
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className={`offer-selection__option ${selectedOffer === offer.id ? 'selected' : ''} ${offer.isPremium ? 'premium' : 'free'}`}
                        onClick={() => handleSelect(offer.id)}
                    >
                        <div className="offer-header">
                            <span className="offer-icon">
                                <Image
                                    src="/assets/hexagon.png"
                                    alt="Icon"
                                    width={20}
                                    height={20}
                                />
                            </span>
                            <span className="offer-name">{offer.name}</span>
                            <span className="offer-price">{offer.price}</span>
                        </div>
                        <ul className="offer-features">
                            {offer.features.map((feature, index) => (
                                <li key={index}>* {feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="offer-selection-bottom">
                <p className="one-time charge">This is a one-time charge.</p>
                <div className="offer-selection__continue">
                    {selectedOffer ? (
                        <button className="offer-selection__button active" onClick={handleContinue}>
                            Pay and continue
                            <div className="drag-handle">
                                <span className="arrow">&rarr;</span>
                            </div>
                        </button>
                    ) : (
                        <button className="offer-selection__button disabled" disabled>
                            Pay and continue
                            <div className="drag-handle">
                                <span className="arrow">&rarr;</span>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(OfferSelection), { ssr: false });
