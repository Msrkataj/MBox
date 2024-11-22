import React, { useState, useRef } from "react";
import Link from 'next/link';
import Image from "next/image";
import dynamic from "next/dynamic";

const OnboardingComponent = () => {

    return (
            <div className="onboarding">
                <div className="onboarding__image">
                    <Image
                        src="/assets/woman-male-driving.png"
                        alt="woman-male-driving-instructor"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="onboarding__main">
                    <div className="onboarding__bottom">
                        <div className="onboarding__text">
                            <h1>DRIVING TEST DATES</h1>
                            <p>
                                Find canceled dates at exam centers and get
                                your license faster than ever. Save time, avoid
                                long waits and move boldly toward your goal!
                            </p>
                        </div>
                        <div className="onboarding__main-button">
                            <Link href="/choose" passHref>
                                <div className="onboarding__button">
                                    Book your date
                                    <div className="drag-handle">
                                        <span className="arrow">&rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default dynamic(() => Promise.resolve(OnboardingComponent), {ssr: false});
