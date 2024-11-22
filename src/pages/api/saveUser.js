import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { licenseNumber, applicationRef } = req.body;

        // Ścieżka do pliku user.json
        const filePath = path.join(process.cwd(), 'src/data/user.json');

        // Odczyt istniejących danych z pliku
        let users = [];
        try {
            const fileData = fs.readFileSync(filePath);
            users = JSON.parse(fileData);
        } catch (error) {
            console.error('Error reading user data:', error);
        }

        // Sprawdzenie, czy użytkownik już istnieje
        const existingUserIndex = users.findIndex(user => user.licenseNumber === licenseNumber);

        if (existingUserIndex !== -1) {
            // Aktualizacja istniejącego użytkownika
            users[existingUserIndex] = { licenseNumber, applicationRef };
        } else {
            // Dodanie nowego użytkownika
            users.push({ licenseNumber, applicationRef });
        }

        // Zapis danych do pliku user.json
        try {
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
            res.status(200).json({ message: 'User data saved successfully' });
        } catch (error) {
            console.error('Error saving user data:', error);
            res.status(500).json({ message: 'Error saving user data' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
