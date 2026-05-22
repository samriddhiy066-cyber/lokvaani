# 🌐 LokVaani - Translator App

LokVaani is a full-stack translator web application that allows users to translate text into different languages and store translation history.

---

## 🚀 Features

- Translate text into multiple languages
- Save translation history in database
- Fetch previous translations
- REST API backend
- Smooth communication between frontend and backend

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB
- Mongoose

---

## 📡 API Endpoints

### ➤ POST /translations
Save translated text to database.

**Request Body:**
```json
{
  "sourceText": "hello",
  "translatedText": "नमस्ते",
  "language": "hi"
}
