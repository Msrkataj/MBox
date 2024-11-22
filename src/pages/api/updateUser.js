// pages/api/updateUser.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { licenseNumber, extendedTest, specialRequirements } = req.body;
        const filePath = path.join(process.cwd(), 'src', 'data', 'user.json');

        try {
            // Odczytaj aktualne dane z pliku JSON
            const fileData = fs.readFileSync(filePath, 'utf8');
            const users = JSON.parse(fileData);

            // Znajdź użytkownika na podstawie numeru licencji
            let user = users.find(user => user.licenseNumber === licenseNumber);

            if (!user) {
                // Jeśli użytkownik nie istnieje, utwórz nowego użytkownika
                user = {
                    licenseNumber,
                    extendedTest,
                    specialRequirements,
                    notifications: [], // Możesz dodać dodatkowe dane, jak notyfikacje
                };
                users.push(user);
            } else {
                // Zaktualizuj dane istniejącego użytkownika
                user.extendedTest = extendedTest;
                user.specialRequirements = specialRequirements;
            }

            // Zapisz zaktualizowane dane do pliku JSON
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
