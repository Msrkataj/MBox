import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LicenseDetails = () => {
    const [extendedTest, setExtendedTest] = useState(null);
    const [specialRequirements, setSpecialRequirements] = useState(null);
    const [specialNeedsOptions, setSpecialNeedsOptions] = useState({
        welshExaminer: false,
        alternateName: false,
        pregnant: false,
        movementRestriction: false,
        dyslexia: false,
        epilepsy: false,
        missingLimbs: false,
        paraplegia: false,
        specialLearning: false,
        nonRestriction: false,
        hardOfHearing: false,
        deaf: false,
    });

    const router = useRouter();
    const isFormComplete = extendedTest !== null && specialRequirements !== null;

    const handleSpecialNeedChange = (option) => {
        setSpecialNeedsOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
    };

    const handleSubmit = async () => {
        try {
            const userData = localStorage.getItem('userData');
            if (!userData) {
                alert('User data not found in storage');
                return;
            }

            const parsedUserData = JSON.parse(userData);
            if (!parsedUserData.licenseNumber) {
                alert('License number not found in user data');
                return;
            }

            const updatedUserData = {
                ...parsedUserData,
                extendedTest,
                specialRequirements,
                specialNeedsOptions,
            };

            localStorage.setItem('userData', JSON.stringify(updatedUserData));

            if (specialRequirements === 'yes') {
                router.push('/special-requirements');
            } else {
                router.push('/login');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="license-details">
            <h1>License details</h1>
            <p className="subtitle">Car test</p>

            <div className="form-group">
                <label>Have you been ordered by a court to take an extended test?</label>
                <div className="radio-group">
                    <label className={extendedTest === 'no' ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="extendedTest"
                            value="no"
                            checked={extendedTest === 'no'}
                            onChange={() => setExtendedTest('no')}
                        />
                        No
                    </label>
                    <label className={extendedTest === 'yes' ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="extendedTest"
                            value="yes"
                            checked={extendedTest === 'yes'}
                            onChange={() => setExtendedTest('yes')}
                        />
                        Yes
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Do you have any special requirements?</label>
                <div className="radio-group">
                    <label className={specialRequirements === 'no' ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="specialRequirements"
                            value="no"
                            checked={specialRequirements === 'no'}
                            onChange={() => setSpecialRequirements('no')}
                        />
                        No
                    </label>
                    <label className={specialRequirements === 'yes' ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="specialRequirements"
                            value="yes"
                            checked={specialRequirements === 'yes'}
                            onChange={() => setSpecialRequirements('yes')}
                        />
                        Yes
                    </label>
                </div>

                {specialRequirements === 'yes' && (
                    <div className="special-needs-container">
                        <p className="section-title">Please tell us if:</p>
                        {['welshExaminer', 'alternateName', 'pregnant'].map((option) => (
                            <div key={option} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={option}
                                    checked={specialNeedsOptions[option]}
                                    onChange={() => handleSpecialNeedChange(option)}
                                />
                                <label htmlFor={option}>{getSpecialNeedLabel(option)}</label>
                            </div>
                        ))}

                        <p className="section-title">Do you have:</p>
                        {['movementRestriction', 'dyslexia', 'epilepsy', 'missingLimbs', 'paraplegia', 'specialLearning', 'nonRestriction'].map((option) => (
                            <div key={option} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={option}
                                    checked={specialNeedsOptions[option]}
                                    onChange={() => handleSpecialNeedChange(option)}
                                />
                                <label htmlFor={option}>{getSpecialNeedLabel(option)}</label>
                            </div>
                        ))}

                        <p className="section-title">Are you:</p>
                        {['hardOfHearing', 'deaf'].map((option) => (
                            <div key={option} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    id={option}
                                    checked={specialNeedsOptions[option]}
                                    onChange={() => handleSpecialNeedChange(option)}
                                />
                                <label htmlFor={option}>{getSpecialNeedLabel(option)}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="license-details__continue">
                {isFormComplete ? (
                    <button className="license-details__button active" onClick={handleSubmit}>
                        Continue
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </button>
                ) : (
                    <button className="license-details__button disabled" disabled>
                        Fill to continue
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};

const getSpecialNeedLabel = (option) => {
    const labels = {
        welshExaminer: 'You require a Welsh speaking examiner',
        alternateName: "You'd like your examiner to call you by a different name",
        pregnant: 'You are heavily pregnant',
        movementRestriction: 'A condition which restricts or limits movement in your arms, legs or body',
        dyslexia: 'Dyslexia',
        epilepsy: 'Epilepsy',
        missingLimbs: 'Missing limbs',
        paraplegia: 'Paraplegia',
        specialLearning: 'Special learning or educational needs',
        nonRestriction: 'A condition which doesn’t restrict or limit movement in your arms, legs or body',
        hardOfHearing: 'Hard of hearing',
        deaf: 'Profoundly deaf - you can arrange to bring a British Sign Language (BSL) interpreter with you',
    };
    return labels[option] || '';
};

export default LicenseDetails;
