import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import notificationIcon from '/public/assets/notification.png';
import emailIcon from '/public/assets/email-icon.png';
import supportIcon from '/public/assets/customer-service.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);
    const [isPushNotificationsEnabled, setIsPushNotificationsEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    useEffect(() => {
        const checkUserSettings = async () => {
            const storedUser = JSON.parse(localStorage.getItem('userData'));
            if (!storedUser) {
                alert('User data not found in localStorage');
                return;
            }

            try {
                const response = await fetch(`${serverUrl}/api/getUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ licenseNumber: storedUser.licenseNumber }),
                });

                if (response.ok) {
                    const userData = await response.json();
                    setEmailExists(!!userData.email);
                    setIsEmailNotificationEnabled(!!userData.email);
                    setIsPushNotificationsEnabled(userData.isPushNotificationsEnabled || false);
                    setEmail(userData.email || '');
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        checkUserSettings();
    }, []);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userData')) || {};
        const updatedUser = {
            ...storedUser,
            isEmailNotificationEnabled,
            isPushNotificationsEnabled,
        };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
    }, [isEmailNotificationEnabled, isPushNotificationsEnabled]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (storedUser && storedUser.isPushNotificationsEnabled !== undefined) {
            setIsPushNotificationsEnabled(storedUser.isPushNotificationsEnabled);
        }
    }, []);

    const handleEmailToggle = async (e) => {
        const enabled = e.target.checked;
        setIsEmailNotificationEnabled(enabled);

        if (enabled && !emailExists) {
            setIsModalOpen(true);
        } else if (!enabled && emailExists) {
            try {
                const storedUser = JSON.parse(localStorage.getItem('userData'));
                const response = await fetch(`${serverUrl}/api/removeUserEmail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ licenseNumber: storedUser.licenseNumber }),
                });

                if (response.ok) {
                    console.log('User email removed successfully');
                    setEmailExists(false);
                    setEmail('');
                    localStorage.setItem('userData', JSON.stringify({ ...storedUser, email: null }));
                } else {
                    console.error('Failed to remove user email');
                }
            } catch (error) {
                console.error('Error removing user email:', error);
            }
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpen(false);

        try {
            const storedUser = JSON.parse(localStorage.getItem('userData'));
            const response = await fetch(`${serverUrl}/api/updateUserEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseNumber: storedUser.licenseNumber, email }),
            });

            if (response.ok) {
                console.log('User email updated successfully');
                setEmailExists(true);
                localStorage.setItem('userData', JSON.stringify({ ...storedUser, email }));
            } else {
                console.error('Failed to update user email');
            }
        } catch (error) {
            console.error('Error updating user email:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEmailNotificationEnabled(false);
    };

    const handlePushNotifications = async () => {
        const storedUser = JSON.parse(localStorage.getItem('userData'));

        if (!storedUser) {
            alert('User data not found');
            return;
        }

        const newPushStatus = !isPushNotificationsEnabled;
        setIsPushNotificationsEnabled(newPushStatus);

        if (newPushStatus) {
            if (!('Notification' in window)) {
                alert('This browser does not support desktop notifications.');
                return;
            }

            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const fcmToken = await getFcmToken(); // Symulowane uzyskanie tokenu FCM
                try {
                    await fetch(`${serverUrl}/api/saveFcmToken`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ licenseNumber: storedUser.licenseNumber, fcmToken }),
                    });
                    console.log('FCM token saved to server successfully');
                    localStorage.setItem('userData', JSON.stringify({ ...storedUser, isPushNotificationsEnabled: true }));
                } catch (error) {
                    console.error('Error saving FCM token:', error);
                }
            }
        } else {
            try {
                await fetch(`${serverUrl}/api/removeFcmToken`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ licenseNumber: storedUser.licenseNumber }),
                });
                console.log('FCM token removed successfully');
                localStorage.setItem('userData', JSON.stringify({ ...storedUser, isPushNotificationsEnabled: false }));
            } catch (error) {
                console.error('Error removing FCM token:', error);
            }
        }
    };



    const getFcmToken = async () => {
        // Placeholder for actual FCM token retrieval
        const fcmToken = 'FAKE_FCM_TOKEN';
        return fcmToken;
    };


    return (
        <div className="settings">
            <div className="settings__header">
                <Link href="/home">
                    <button className="settings__header-button">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </Link>
                <div className="settings__header-titles">
                    <h1 className="settings__header-title">Driving Test Dates</h1>
                    <h2 className="settings__header-subtitle">App settings</h2>
                </div>
            </div>
            <div className="settings__options">
                <div className="settings__options__option">
                    <div className="settings__options__option-icon">
                        <Image src={notificationIcon} alt="Push notifications" width={24} height={24}/>
                    </div>
                    <div className="settings__options__option-content">
                        <h3 className="settings__options__option-content-title">Push notifications</h3>
                        <p className="settings__options__option-content-status">
                            {isPushNotificationsEnabled ? 'Activated' : 'Inactive'}
                        </p>
                    </div>
                    <div className="settings__options__option-toggle">
                        <input type="checkbox" checked={isPushNotificationsEnabled} onChange={handlePushNotifications}/>
                    </div>
                </div>
                <div className="settings__options__option">
                    <div className="settings__options__option-icon">
                        <Image src={emailIcon} alt="E-mail notifications" width={24} height={24}/>
                    </div>
                    <div className="settings__options__option-content">
                        <h3 className="settings__options__option-content-title">E-mail notifications</h3>
                        <p className="settings__options__option-content-status">
                            {isEmailNotificationEnabled ? 'Activated' : 'Inactive'}
                        </p>
                    </div>
                    <div className="settings__options__option-toggle">
                        <input type="checkbox" checked={isEmailNotificationEnabled} onChange={handleEmailToggle}/>
                    </div>
                </div>
                <Link href="/support">
                    <div className="settings__options__option">
                        <div className="settings__options__option-icon">
                            <Image src={supportIcon} alt="Support" width={24} height={24}/>
                        </div>
                        <div className="settings__options__option-content">
                            <h3 className="settings__options__option-content-title">Support</h3>
                            <p className="settings__options__option-content-status">Contact us by e-mail</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="settings__footer">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms">Terms & Conditions</Link>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <button className="modal__close" onClick={closeModal}>&times;</button>
                        <h2>Enter Your Email Address</h2>
                        <form onSubmit={handleEmailSubmit}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="modal__input"
                            />
                            <p className="modal__privacy-notice">
                                By providing your email address, you consent to the processing of your personal data in
                                accordance with our <a href="/privacy-policy" target="_blank">Privacy Policy</a>. Your
                                data will be used solely for the purpose of sending notifications regarding available
                                driving test dates and will not be shared with third parties without your explicit
                                consent. We take the security of your data seriously and have implemented measures to
                                protect it against unauthorized access or disclosure. You can withdraw your consent at
                                any time by updating your preferences in the settings or contacting our support team.
                            </p>
                            <button type="submit" className="modal__submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default dynamic(() => Promise.resolve(Settings), { ssr: false });
