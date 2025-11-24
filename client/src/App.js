import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import CarAdsPage from './components/pages/caradspage';
import CategoryViewPage from './pages/CategoryView/CategoryViewPage';
import AdDetailsPage from './pages/AdDetailsPage';
import Secure from "./components/Secure"; // ✅ import Secure component
import NoAccessPage from './pages/NoAccessPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import MainDashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryId" element={<CategoryViewPage />} />
        <Route path="/adds" element={<CarAdsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<MainDashboard />} />

        {/* ✅ Protected Route - Only logged-in users can access */}
        <Route element={<Secure />}>
          <Route path="/ads/:adId" element={<AdDetailsPage />} />
          <Route path="/chat/:receiverId" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NoAccessPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
