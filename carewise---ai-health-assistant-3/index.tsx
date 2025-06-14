
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from "./languageContext"; // Import LanguageProvider

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider> {/* Wrap App with LanguageProvider */}
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
