// pages/api/removeUserEmail.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { licenseNumber } = req.body;

    if (!licenseNumber) {
        return res.status(400).json({ message: 'License number is required' });
    }

    const filePath = path.join(process.cwd(), 'src/data/user.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user data' });
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.licenseNumber === licenseNumber);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users[userIndex].email = undefined; // Usuń email użytkownika

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating user data' });
            }

            res.status(200).json({ message: 'User email removed successfully' });
        });
    });
};
