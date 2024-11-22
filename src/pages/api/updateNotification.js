import fs from 'fs';
import path from 'path';

// Określenie ścieżki do pliku notifications.json
const filePath = path.join(process.cwd(), 'src', 'data', 'notifications.json');

export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Pobieranie danych z ciała żądania
            const updatedNotification = req.body;

            // Odczytywanie istniejących powiadomień
            const fileData = fs.readFileSync(filePath, 'utf8');
            const notifications = JSON.parse(fileData);

            // Znalezienie indeksu powiadomienia do aktualizacji
            const notificationIndex = notifications.findIndex(
                (notification) => notification.text === updatedNotification.text && notification.date === updatedNotification.date
            );

            if (notificationIndex === -1) {
                // Powiadomienie nie zostało znalezione
                return res.status(404).json({ message: 'Notification not found' });
            }

            // Aktualizacja powiadomienia na przeczytane
            notifications[notificationIndex] = { ...notifications[notificationIndex], read: true };

            // Zapis zaktualizowanych danych do pliku
            fs.writeFileSync(filePath, JSON.stringify(notifications, null, 2));

            // Zwrot odpowiedzi o powodzeniu
            res.status(200).json({ message: 'Notification updated successfully' });
        } catch (error) {
            console.error('Error updating notification:', error);
            res.status(500).json({ message: 'Error updating notification' });
        }
    } else {
        // Obsługa innych metod HTTP
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
