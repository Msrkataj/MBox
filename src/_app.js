import React, { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
