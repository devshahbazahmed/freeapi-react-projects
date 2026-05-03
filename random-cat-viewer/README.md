# 🐱 Random Cat Viewer (React)

A simple and interactive React application that fetches and displays random cat images using a public API. Built with a focus on clean UI, smooth user experience, and responsive design.

## 📌 Features

- 🐾 Fetch random cat images from API
- 🔄 Load a new image with a button click
- ⏳ Loading state with skeleton UI
- ❌ Error handling for failed requests
- 📱 Fully responsive design
- 🎨 Clean and modern UI using Tailwind CSS

---

## 🌐 API Used

**Endpoint:**

```
https://api.freeapi.app/api/v1/public/cats/cat/random
```

**Sample Response:**

```json
{
  "data": {
    "url": "https://example-cat-image.jpg"
  }
}
```

---

## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS
- Axios (for API requests)

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/random-cat-viewer.git
cd random-cat-viewer
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css
```

---

## 🧠 How It Works

- The app calls the Random Cat API on initial load using `useEffect`
- The image URL is stored in state using `useState`
- Clicking the "Load New Cat" button triggers a new API request
- UI updates dynamically based on loading, success, or error state

---

## ✨ Future Improvements

- ❤️ Add “Favorite Cats” feature using localStorage
- 📥 Download cat images
- 🎞️ Add animation transitions between images
- 🌓 Dark mode support
- 🖼️ Gallery view for previously loaded cats

## 📄 License

This project is open source and available under the MIT License.

---

## 🙌 Acknowledgements

- Public API provider for free cat images
- Inspiration from modern UI/UX design practices
