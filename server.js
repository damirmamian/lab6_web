const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "Всі поля обов'язкові" });
    }

    try {
        let testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        let info = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: "damirmamian@gmail.com",
            subject: `Лаба 6: ${subject}`,
            text: message,
            html: `<p><strong>Від:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
        });
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("Лист надіслано! Переглянути тут:", previewUrl);
        res.status(200).json({
            message: "Лист надіслано!",
            preview: previewUrl
        });

    } catch (error) {
        console.error("Помилка Nodemailer:", error);
        res.status(500).json({ error: "Помилка при відправці пошти" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер працює на http://localhost:${PORT}`);
});