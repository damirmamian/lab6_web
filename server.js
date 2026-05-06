const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', async (req, res) => {
    console.log("Отримано дані:", req.body);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Всі поля обов'язкові" });
    }

    try {
        res.status(200).json({ message: "Дані отримано на бекенді!" });
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});