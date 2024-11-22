// pages/api/updateUserTest.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { licenseNumber, selectedTest } = req.body;
        const filePath = path.join(process.cwd(), 'src', 'data', 'user.json');

        try {
            // Odczytaj aktualne dane z pliku JSON
            const fileData = fs.readFileSync(filePath, 'utf8');
            const users = JSON.parse(fileData);

            // Znajdź użytkownika na podstawie numeru licencji
            const userIndex = users.findIndex(user => user.licenseNumber === licenseNumber);

            if (userIndex !== -1) {
                // Zaktualizuj dane użytkownika, dodając obiekt testu z nazwą
                users[userIndex].selectedTest = {
                    id: selectedTest.id,
                    name: selectedTest.name,
                    icon: selectedTest.icon,
                };

                // Zapisz zaktualizowane dane do pliku JSON
                fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
                res.status(200).json({ message: 'User test type updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error updating user test type:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
