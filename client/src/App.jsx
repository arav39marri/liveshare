import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import DownloadPage from "./pages/DownloadPage.jsx";
import { useTheme } from "./hooks/useTheme.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
