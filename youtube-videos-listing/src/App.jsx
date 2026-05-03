import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="min-h-[calc(100vh-72px)] bg-neutral-950 text-white md:flex">
        <Sidebar />

        <main className="w-full min-w-0">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/video/:id" element={<VideoPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
