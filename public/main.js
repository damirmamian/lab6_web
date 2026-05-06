// 1 
const browserData = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`
};

localStorage.setItem('browserInfo', JSON.stringify(browserData));

const footer = document.createElement('footer');
footer.style.padding = '20px';
footer.style.borderTop = '1px solid #ccc';
footer.style.marginTop = '20px';

const storedData = JSON.parse(localStorage.getItem('browserInfo'));
footer.innerHTML = `
    <h3>System Information (from localStorage):</h3>
    <p><strong>Browser:</strong> ${storedData.userAgent}</p>
    <p><strong>OS/Platform:</strong> ${storedData.platform}</p>
    <p><strong>Resolution:</strong> ${storedData.screenResolution}</p>
`;
document.body.appendChild(footer);

// 2
const postId = 14;

async function fetchComments() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const comments = await response.json();

        const section = document.createElement('section');
        section.innerHTML = '<h2>Employer Comments</h2>';

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.style.marginBottom = '15px';
            commentDiv.innerHTML = `
                <strong>${comment.name}</strong> (${comment.email})
                <p>${comment.body}</p>
            `;
            section.appendChild(commentDiv);
        });

        document.querySelector('main').appendChild(section);
    } catch (error) {
        console.error('Помилка завантаження коментарів:', error);
    }
}

fetchComments();

// 3
const modal = document.getElementById('contactModal');
const closeBtn = document.getElementById('closeModal');
const form = document.getElementById('fs-form');

const closeModal = () => {
    modal.style.display = 'none';
};

closeBtn.onclick = closeModal;

window.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};

window.onkeydown = (event) => {
    if (event.key === "Escape" && modal.style.display === 'flex') {
        closeModal();
    }
};

// Оновлений обробник для Node.js бекенду
form.onsubmit = async (e) => {
    e.preventDefault();
    console.log("Кнопка натиснута, починаємо відправку...");

    // Отримуємо дані безпосередньо з елементів форми
    const formData = {
        name: form.querySelector('[name="name"]')?.value,
        email: form.querySelector('[name="email"]')?.value,
        subject: form.querySelector('[name="subject"]')?.value || "No Subject",
        message: form.querySelector('[name="message"]')?.value
    };

    console.log("Дані форми зібрано:", formData);

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        console.log("Статус відповіді сервера:", response.status);

        if (response.ok) {
            const result = await response.json();
            alert('Повідомлення надіслано! Перевірте консоль сервера.');
            form.reset();
            closeModal();
        } else {
            const errorText = await response.text();
            alert('Сервер повернув помилку: ' + errorText);
        }
    } catch (error) {
        console.error('Помилка мережі:', error);
        alert('Не вдалося зв’язатися з сервером. Перевір, чи запущений node server.js');
    }
};

setTimeout(() => {
    modal.style.display = 'flex';
}, 60);

// 4
const themeToggle = document.getElementById('theme-toggle');

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function applyTimeTheme() {
    const hour = new Date().getHours();
    const isNight = hour < 7 || hour >= 21;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && isNight)) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

themeToggle.addEventListener('click', toggleDarkMode);
applyTimeTheme();