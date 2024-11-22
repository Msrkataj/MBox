import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from "next/dynamic";

const PremiumSuccess = () => {
    return (
        <div className="premium-success">
            <div className="premium-success__icon">
                <Image
                    src="/assets/hexagon.png"
                    alt="Success Icon"
                    width={100}
                    height={100}
                    layout="intrinsic"
                />
            </div>
            <p className="subtitle">Congratulations</p>
            <h1>You’re Premium</h1>
            <p className="description">Let’s get your license now</p>
            <div className="premium-success__continue">
                <Link href="/test">
                    <div className="premium-success__button">
                        Go to booking
                        <div className="drag-handle">
                            <span className="arrow">&rarr;</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};
export default dynamic(() => Promise.resolve(PremiumSuccess), {ssr: false});

