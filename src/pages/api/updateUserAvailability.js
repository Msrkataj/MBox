import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'user.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Server error while reading data' });
        }

        const users = JSON.parse(data);
        const updatedUser = req.body;

        const userIndex = users.findIndex(user => user.licenseNumber === updatedUser.licenseNumber);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Aktualizacja danych użytkownika
        users[userIndex].availability = updatedUser.availability;

        fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Server error while saving data' });
            }

            res.status(200).json({ message: 'Availability saved successfully' });
        });
    });
}
