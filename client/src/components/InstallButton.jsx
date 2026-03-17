import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // Prevent automatic mini-infobar
      setDeferredPrompt(e);
      setVisible(true); // Show button
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Show button in development for testing
    if (import.meta.env.DEV) {
      setVisible(true);
      console.log("Install button visible in development mode");
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // In development, just show a message
      alert("PWA install only works in production with HTTPS and proper icons");
      return;
    }

    deferredPrompt.prompt(); // Show install dialog

    const { outcome } = await deferredPrompt.userChoice;
    console.log("User response:", outcome);

    setDeferredPrompt(null);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleInstall}
      className="button secondary"
      style={{ cursor: 'pointer' }}
    >
      {deferredPrompt ? "Install FileShare" : "Install fileshare"}
    </button>
  );
}
