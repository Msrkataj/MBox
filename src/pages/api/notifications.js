// pages/api/notifications.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'src', 'data', 'notifications.json');

    try {
        // Odczyt pliku z powiadomieniami
        const data = await fs.readFile(filePath, 'utf8');
        const notifications = JSON.parse(data);

        // Wysyłanie odpowiedzi do klienta
        res.status(200).json(notifications);
    } catch (err) {
        console.error('Błąd odczytu pliku:', err);

        // Wysyłanie odpowiedzi w przypadku błędu
        res.status(500).json({ error: 'Błąd serwera' });
    }
}
