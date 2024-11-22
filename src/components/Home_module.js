import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import calendar from "/public/assets/calendar.png";
import drivingRafiki from "/public/assets/driving-rafiki.png";
import supportIcon from "/public/assets/customer-service.png";

const HomeModule = () => {
    const [notifications, setNotifications] = useState([]);
    const [topNotification, setTopNotification] = useState(null);
    const [bottomNotifications, setBottomNotifications] = useState([]);
    const [showSupportMessage, setShowSupportMessage] = useState(false);
    const router = useRouter();
    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`${serverUrl}/api/notifications`);
                const data = await response.json();

                setNotifications(data);

                const unreadNotification = data.find((notification) => !notification.read);
                setTopNotification(unreadNotification);
                setBottomNotifications([...data].reverse());
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        if (topNotification && !showSupportMessage) {
            const timer = setTimeout(async () => {
                try {
                    await fetch(`${serverUrl}/api/notifications/update`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            text: topNotification.text,
                            date: topNotification.date,
                        }),
                    });

                    setNotifications((prev) =>
                        prev.map((notification) =>
                            notification.text === topNotification.text &&
                            notification.date === topNotification.date
                                ? { ...notification, read: true }
                                : notification
                        )
                    );

                    setTopNotification(null);

                    setBottomNotifications((prev) => [...prev].reverse());

                    const nextUnread = notifications.find((notification) => !notification.read);
                    setTopNotification(nextUnread || null);
                } catch (error) {
                    console.error('Error updating notification:', error);
                }
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [topNotification, showSupportMessage, notifications]);


    return (
        <div className="home">
            <div className="home__header">
                <h1 className="home__title">Driving Test Dates</h1>
                <Link href="/settings">
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        className="home__option-icon"
                        fill="currentColor"
                    >
                        <path
                            d="M0,3.5A1.5,1.5,0,0,1,1.5,2h16a1.5,1.5,0,0,1,0,3H1.5A1.5,1.5,0,0,1,0,3.5ZM17.5,18H1.5a1.5,1.5,0,0,0,0,3h16a1.5,1.5,0,0,0,0-3Zm5-8H6.5a1.5,1.5,0,0,0,0,3h16a1.5,1.5,0,0,0,0-3Z"/>
                    </svg>
                </Link>
            </div>
            {showSupportMessage ? (
                <div className="home__top-notification">
                    <Image src={supportIcon} alt="Support Notification" width={80} height={50}/>
                    <div className="home__top-notification-text">
                        <p className="home__top-notification-title">Support Message</p>
                        <p className="home__top-notification-subtitle">Your message has been sent to support.</p>
                    </div>
                </div>
            ) : topNotification ? (
                <div className="home__top-notification">
                    <Image src={drivingRafiki} alt="Notification Image" width={80} height={50}/>
                    <div className="home__top-notification-text">
                        <p className="home__top-notification-title">Driving Test Dates</p>
                        <p className="home__top-notification-subtitle">{topNotification.text}</p>
                        <span>Click here and check it now</span>
                    </div>
                </div>
            ) : null}
            <div className="home__options">
                <Link href="/manual-booking" className="home__option home__option--active">
                    <div className="home__option-content">
                        <h2 className="home__option-title">Manual booking</h2>
                        <p className="home__option-subtitle">Check free dates</p>
                    </div>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        className="home__option-icon"
                        fill="currentColor"
                    >
                        <path
                            d="M20.991,6.981H0A5,5,0,0,1,5,1.995V1A1,1,0,0,1,7,1v1h7V1a1,1,0,0,1,2,0v1A5,5,0,0,1,20.991,6.981Zm-.162,11.788L15,16.483V11.036a2.071,2.071,0,0,0-1.663-2.074A2,2,0,0,0,11,10.929v9.9c-1.076-.884-2.11-1.747-2.144-1.779a2.287,2.287,0,0,0-3.136,3.33L7.545,24H24v-.591a4.986,4.986,0,0,0-3.17-4.64ZM9,16.792V10.93a3.949,3.949,0,0,1,.538-1.955H0v5.984a4.986,4.986,0,0,0,3.182,4.633,4.214,4.214,0,0,1,.985-1.8,4.3,4.3,0,0,1,4.839-1ZM20.7,16.574a4.9,4.9,0,0,0,.293-1.616V8.975H16.453A4.157,4.157,0,0,1,17,11.037v4.088l3.7,1.45Z"/>
                    </svg>
                </Link>
                <Link href="/test-choose" className="home__option">
                    <div className="home__option-content">
                        <h2 className="home__option-title">Test centres</h2>
                        <p className="home__option-subtitle">Your test centres</p>
                    </div>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        className="home__option-icon"
                        fill="currentColor"
                    >
                        <path
                            d="M16.949,2.05a7,7,0,1,0-9.891,9.907L9.553,14.4a3.519,3.519,0,0,0,4.894,0l2.5-2.448a7,7,0,0,0,0-9.9ZM12,9.99a3,3,0,1,1,3-3A3,3,0,0,1,12,9.99Zm12,6.772a1,1,0,0,1-.485.863l-9.861,5.917a3.206,3.206,0,0,1-3.306,0L.485,17.625A1,1,0,0,1,.5,15.9L5.35,13.063c.1.11.2.219.309.325l2.495,2.439a5.518,5.518,0,0,0,7.692,0l2.518-2.463c.1-.1.194-.2.287-.3L23.5,15.9a1,1,0,0,1,.5.857Z"/>
                    </svg>
                </Link>
                <Link href="/test-dates" className="home__option">
                    <div className="home__option-content">
                        <h2 className="home__option-title">Test dates</h2>
                        <p className="home__option-subtitle">Your availability for autobook</p>
                    </div>
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        className="home__option-icon"
                        fill="currentColor"
                    >
                        <path
                            d="M24,7V8H0V7A5,5,0,0,1,5,2H6V1A1,1,0,0,1,7,0H7A1,1,0,0,1,8,1V2h8V1a1,1,0,0,1,1-1h0a1,1,0,0,1,1,1V2h1A5,5,0,0,1,24,7Zm0,10a7,7,0,1,1-7-7A7.008,7.008,0,0,1,24,17Zm-5,.586-1-1V15a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v2a1,1,0,0,0,.293.707L17.586,19A1,1,0,0,0,19,19h0a1,1,0,0,0,0-1.414ZM8,17a8.98,8.98,0,0,1,3.349-7H0v9a5,5,0,0,0,5,5h6.349A8.98,8.98,0,0,1,8,17Z"/>
                    </svg>
                </Link>
            </div>
            <div className="home__notifications">
                <h2 className="home__notifications-title">Notifications</h2>
                {bottomNotifications.map((notification) => (
                    <div key={notification.id} className="home__notification">
                        <Image src={calendar} alt="Notification Icon" width={30} height={30} className="home__notification-icon"/>
                        <div className="home__notification-text">
                            <p>{notification.text}</p>
                            <span>{notification.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(HomeModule), { ssr: false });
