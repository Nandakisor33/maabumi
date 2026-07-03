import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Health check endpoint (must be before static files / fallback routes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve static assets from build output (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback: Return index.html for any unmatched route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Listen on process.env.PORT, bind to 0.0.0.0
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});