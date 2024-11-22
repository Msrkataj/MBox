import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';

const EmailNotification = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleContinue = async () => {
        // Pobierz numer licencji z localStorage
        const userData = localStorage.getItem('userData');

        if (!userData) {
            alert('User data not found in localStorage');
            return;
        }

        const parsedUserData = JSON.parse(userData);
        const { licenseNumber } = parsedUserData;

        const updatedUser = {
            ...parsedUserData,
            email,
        };

        // Zaktualizuj dane w localStorage
        localStorage.setItem('userData', JSON.stringify(updatedUser));

        // Wyślij dane do API, aby zapisać zaktualizowane informacje
        try {
            const response = await fetch(`${serverUrl}/api/updateUserEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseNumber, email }),
            });

            if (response.ok) {
                console.log('User email updated successfully');
                router.push('/home');
            } else {
                console.error('Failed to update user email');
                alert('Failed to update user email');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: An error occurred. Please try again.');
        }
    };

    return (
        <div className="email-notification">
            <div className="image-container">
                <Image
                    src="/assets/email.png"
                    alt="Email illustration"
                    width={300}
                    height={300}
                    layout="responsive"
                    priority
                />
            </div>
            <p className="subtitle">Get notifications</p>
            <h1>Add e-mail</h1>
            <div className="input-container">
                <input
                    type="email"
                    placeholder="Type e-mail"
                    value={email}
                    onChange={handleEmailChange}
                />
                <span className="input-icon">
                    <Image
                        src="/assets/envelope.png" // Replace with the correct icon path
                        alt="Mail icon"
                        width={30}
                        height={20}
                    />
                </span>
            </div>
            <div className="footer">
                {!email && (
                    <Link href="/home" className="skip-link">
                        Skip for now
                    </Link>
                )}
                {email && (
                    <div className="continue-button-container active" onClick={handleContinue}>
                        <div className="continue-button">
                            Continue
                            <div className="drag-handle">
                                <span className="arrow">&rarr;</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(EmailNotification), { ssr: false });
