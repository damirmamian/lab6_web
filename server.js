const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// 1. Мідлвари (ОБОВ'ЯЗКОВО ПЕРЕД РОУТАМИ)
app.use(express.json()); // Щоб сервер розумів JSON, який ти шлеш з main.js
app.use(express.static(path.join(__dirname, 'public')));

// 2. Ендпоінт POST /api/contact (Додай це зараз!)
app.post('/api/contact', async (req, res) => {
    console.log("Отримано дані:", req.body);
    const { name, email, subject, message } = req.body;

    // Базова валідація згідно з методичкою [cite: 9]
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Всі поля обов'язкові" });
    }

    try {
        // Тут буде логіка відправки через nodemailer, яку ми обговорювали
        // Поки що просто повертаємо успіх для тесту
        res.status(200).json({ message: "Дані отримано на бекенді!" });
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера" });
    }
});

// 3. Головна сторінка [cite: 6]
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});