import React, { useState } from "react";
import '../../styles/globals.scss'
import Onboarding_module from "@/components/Onboarding_module";


const Home = () => {
    const [showChat, setShowChat] = useState(false); // Dodaj stan do kontroli wyświetlania czatu
    const [minimized, setMinimized] = useState(true); // Stan minimalizacji

    const handleOpenChat = () => {
        setShowChat(true); // Ustaw na true, aby załadować i wyświetlić ikonę czatu
        setMinimized(false); // Ustaw na false, aby otworzyć czat
    };

    return (
        <>
            <header>
            </header>
            <main>
                <Onboarding_module/>
            </main>
            <footer>
            </footer>
        </>
    );
}

export default Home;
