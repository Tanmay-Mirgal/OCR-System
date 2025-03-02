# 🛍️ Product Identification & Recommendation System

A **Product Identification System** similar to **Google Lens**, using **Flask, React.js, and a trained Machine Learning model**. This project allows users to upload an image of a product, which is then processed to identify the product and suggest related items from the database.

---

## 🚀 Features

✅ **Trained Image Recognition Model** – Identifies products from images  
✅ **Flask Backend** – Handles image processing and model inference  
✅ **React Frontend** – User-friendly interface for uploading and viewing results  
✅ **Product Recommendation System** – Suggests similar products from the database  
✅ **REST API Integration** – Connects frontend with backend seamlessly  
✅ **Supports Multiple Formats** – Identifies products from images in JPG, PNG, and more  

---

## 🛠️ Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS**

### Backend:
- **Flask (Python)**
- **TensorFlow/Keras (Trained Model)**
- **OpenCV & NumPy**
- **Database (for storing and retrieving related products)**

---

## 📂 Project Structure

```
PRODUCT-ID-SYSTEM/
│── backend/               # Flask backend
│   ├── model/             # Trained image recognition model
│   ├── database/          # Product database
│   ├── app.py             # Main Flask application
│   ├── requirements.txt   # Python dependencies
│── frontend/              # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Main pages
│   │   ├── App.js         # Main App component
│   │   ├── index.js       # Entry point
│   ├── package.json       # React dependencies
│── README.md              # Project documentation
```

---

## 📌 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Tanmay-Mirgal/OCR-System.git
cd OCR-System
```

### 2️⃣ Setup the Backend (Flask)

```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python app.py
```

The backend will start running at `http://127.0.0.1:5000/`.

### 3️⃣ Setup the Frontend (React.js)

```sh
cd ../frontend
npm install
npm start
```

The frontend will start running at `http://localhost:3000/`.

---

## 🎨 UI Preview

### DEMO APP:
![DEMO](https://raw.githubusercontent.com/Tanmay-Mirgal/OCR-System/main/assets/demo.jpg)

---

## 📜 License

This project is **open-source** and available under the [MIT License](LICENSE).  

---

## 🤝 Contributing

Contributions are welcome! To contribute:  
1. Fork the repository  
2. Create a new branch (`feature-name`)  
3. Commit your changes  
4. Push the branch and create a **Pull Request**  

---

## 📬 Connect with Me

[![GitHub](https://img.shields.io/badge/GitHub-TanmayMirgal-blue?style=flat&logo=github)](https://github.com/Tanmay-Mirgal)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-TanmayMirgal-blue?style=flat&logo=linkedin)](YOUR_LINKEDIN_URL)  
[![Twitter](https://img.shields.io/badge/Twitter-TanmayMirgal-blue?style=flat&logo=twitter)](YOUR_TWITTER_URL)  

---

