# H4K4T0N

## Опис
H4K4T0N — це веб-додаток на базі React + Vite, який містить основні сторінки Home та About, а також використовує React Router для навігації.

## Використані технології
- **React 19** — для створення компонентного інтерфейсу
- **Vite** — швидке середовище для розробки
- **React Router** — для маршрутизації
- **ESLint** — перевірка коду
- **CSS** — стилізація
- **Firebase Auth** — автентифікація
- **Firestore** — база даних

## Встановлення та запуск
### 1. Клонування репозиторію
```sh
git clone https://github.com/harperreynell/unknown.git
cd H4K4T0N
```

### 2. Налаштування Firebase
Для розгортання проєкту локально, необхідно створити власну базу даних у Firebase. Це можна зробити на сайті:

[Firebase Console](https://console.firebase.google.com/)

Отримані ключі конфігурації потрібно вставити у файл `src/backend/server.jsx`:
```js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

### 3. Встановлення залежностей
```sh
npm install
```

### 4. Запуск розробницького сервера
```sh
npm run dev
```

### 5. Збірка проєкту
```sh
npm run build
```

### 6. Попередній перегляд зібраного проєкту
```sh
npm run preview
```

## Запуск через Docker
Проєкт також можна запустити за допомогою Docker.

### Завантаження образу
```sh
docker pull whoami1331/unknown
```

### Запуск контейнера
```sh
docker run -p 5173:5173 docker.io/whoami1331/unknown:latest
```

## Відомі проблеми
- Через відсутність фінансування використання Firebase Storage для збереження фотографій, відео та інших медіа наразі недоступне.
- Конфігурація Firebase зберігається безпосередньо в коді, що може бути проблемою з точки зору безпеки.

