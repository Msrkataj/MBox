// pages/api/saveNotification.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { text, imageUrl, date, read } = req.body; // Upewnij się, że te pola są przesyłane
        const notification = {
            text,
            imageUrl,
            date,
            read: read || false // Domyślnie ustawia 'read' na false, jeśli nie jest podane
        };

        // Ścieżka do pliku JSON
        const filePath = path.join(process.cwd(), 'src', 'data', 'notifications.json');

        // Odczyt istniejących powiadomień
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Błąd odczytu pliku:', err);
                return res.status(500).json({ error: 'Błąd odczytu pliku z powiadomieniami' });
            }

            let notifications;
            try {
                notifications = JSON.parse(data); // Parsowanie danych JSON
            } catch (parseError) {
                console.error('Błąd parsowania JSON:', parseError);
                return res.status(500).json({ error: 'Błąd parsowania pliku JSON' });
            }

            notifications.push(notification);

            // Zapis zaktualizowanej tablicy powiadomień do pliku
            fs.writeFile(filePath, JSON.stringify(notifications, null, 2), (err) => {
                if (err) {
                    console.error('Błąd zapisu pliku:', err);
                    return res.status(500).json({ error: 'Błąd zapisu powiadomienia' });
                }

                res.status(200).json({ message: 'Powiadomienie zapisane pomyślnie' });
            });
        });
    } else {
        res.status(405).json({ error: 'Metoda niedozwolona' });
    }
}
