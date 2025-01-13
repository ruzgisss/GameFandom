const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints for future implementation
app.get('/api/featured', (req, res) => {
    // TODO: Implement featured content API
    res.json([
        {
            title: 'GTA 6 - Tüm Bilinen Detaylar',
            description: 'Rockstar Games\'in merakla beklenen oyunu hakkında bilmeniz gereken her şey...',
            image: 'images/game1.jpg'
        },
        // Add more featured content
    ]);
});

app.get('/api/trending', (req, res) => {
    // TODO: Implement trending topics API
    res.json([
        'Cyberpunk 2077 DLC İncelemesi',
        'League of Legends Yeni Şampiyon',
        'CS2 Yeni Güncelleme Detayları',
        'Elden Ring DLC Çıkış Tarihi',
        'Starfield Mod Rehberi'
    ]);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Bir şeyler ters gitti!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});