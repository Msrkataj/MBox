import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';

const LoginComponent = () => {
    const [licenseNumber, setLicenseNumber] = useState('');
    const [applicationRef, setApplicationRef] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [debouncedLicenseNumber, setDebouncedLicenseNumber] = useState('');
    const router = useRouter();

    const serverUrl = 'https://drive-test-3bee5c1b0f36.herokuapp.com';

    const validateLicenseNumber = (number) => {
        if (number.length !== 16) {
            return 'Driving license number must be 16 characters long.';
        }

        const surnamePart = number.slice(0, 5).replace(/9/g, '');
        const isMacSurname = surnamePart.startsWith('MAC');
        const formattedSurnamePart = isMacSurname ? 'MC' + surnamePart.slice(3) : surnamePart;

        if (!/^[A-Z9]+$/.test(formattedSurnamePart)) {
            return 'First five characters must contain valid surname initials or be padded with 9s.';
        }

        return '';
    };

    const validateApplicationRef = (ref) => {
        const regex = /^\d{8}$/;
        return regex.test(ref);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setLicenseNumber(debouncedLicenseNumber);
        }, 300);

        return () => clearTimeout(handler);
    }, [debouncedLicenseNumber]);

    const handleFindTest = async () => {
        const validationErrors = {};

        const licenseValidationError = validateLicenseNumber(licenseNumber);
        if (licenseValidationError) {
            validationErrors.licenseNumber = licenseValidationError;
        }

        if (!applicationRef) {
            validationErrors.applicationRef = 'Application ref. / Theory test no. is required.';
        } else if (!validateApplicationRef(applicationRef)) {
            validationErrors.applicationRef = 'Application ref. / Theory test no. must be 8 digits.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${serverUrl}/api/saveUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseNumber, applicationRef }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userData', JSON.stringify(data.user));
                const user = data.user;

                if (user.extendedTest && user.specialRequirements) {
                    router.push(user.isPremium ? '/home' : '/offer-selection');
                } else {
                    router.push('/choose');
                }
            } else {
                setErrors({ general: data.message || 'An error occurred. Please try again.' });
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ general: 'Network error. Please check your connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <section className="login">
                <div className="login-image">
                    <Image
                        src="/assets/driving-rafiki.png"
                        alt="driving-rafiki"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="login-main">
                    <label htmlFor="license" className="login-label">Driving license number</label>
                    <input
                        type="text"
                        id="license"
                        name="license"
                        placeholder="Type here..."
                        className="login-input"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                    />
                    {errors.licenseNumber && <p className="error-message">{errors.licenseNumber}</p>}

                    <label htmlFor="application" className="login-label">Application ref. / Theory test no.</label>
                    <input
                        type="text"
                        id="application"
                        name="application"
                        placeholder="Type here..."
                        className="login-input"
                        value={applicationRef}
                        onChange={(e) => setApplicationRef(e.target.value)}
                    />
                    {errors.applicationRef && <p className="error-message">{errors.applicationRef}</p>}
                </div>
            </section>
            <div className="login-button-container">
                <button className="login-button" onClick={handleFindTest}>
                    <span className="button-text">Find me a test</span>
                    <div className="drag-handle">
                        <span className="arrow">&rarr;</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(LoginComponent), { ssr: false });
