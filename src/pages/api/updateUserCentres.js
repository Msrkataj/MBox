// pages/api/updateUserCentres.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { licenseNumber, selectedCentres } = req.body;

    if (!licenseNumber) {
        return res.status(400).json({ message: 'License number is required' });
    }

    const filePath = path.join(process.cwd(), 'src/data/user.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user.json:', err);
            return res.status(500).json({ message: 'Error reading user data' });
        }

        let users = JSON.parse(data);

        const userIndex = users.findIndex(user => user.licenseNumber === licenseNumber);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users[userIndex].selectedCentres = selectedCentres;

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing to user.json:', err);
                return res.status(500).json({ message: 'Error updating user data' });
            }

            return res.status(200).json({ message: 'Selected centres updated successfully' });
        });
    });
}
