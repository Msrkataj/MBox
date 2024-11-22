import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import dynamic from "next/dynamic";
import Image from "next/image";
import supportIcon from "../../public/assets/customer-service.png";
import { useRouter } from 'next/router';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const notificationData = {
            text: `Support message from ${email}`,
            imageUrl: "/assets/customer-service.png",
            date: new Date().toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
            }),
            read: false
        };

        try {
            const response = await fetch('/api/saveNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(notificationData)
            });

            if (response.ok) {
                router.push('/home');
            } else {
                alert('Nie udało się zapisać powiadomienia. Spróbuj ponownie.');
            }
        } catch (error) {
            console.error('Błąd podczas zapisywania powiadomienia:', error);
            alert('Wystąpił błąd. Spróbuj ponownie.');
        }
    };

    return (
        <div className="contact">
            <div className="contact__header">
                <Link href="/home">
                    <button className="contact__header-button">
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </button>
                </Link>
                <div className="contact__header-titles">
                    <Image src={supportIcon} alt="Support" width={50} height={50}/>
                    <h1 className="contact__header-title">Contact Support</h1>
                </div>
            </div>
            <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="contact__form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="contact__form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <p className="contact__info">
                    Please ensure your details are correct. By submitting this form, you agree to our terms and that your data will be used to help resolve your query.
                </p>
                <button type="submit" className="contact__form-submit">Send Message</button>
            </form>
        </div>
    );
};

export default dynamic(() => Promise.resolve(Contact), {ssr: false});
