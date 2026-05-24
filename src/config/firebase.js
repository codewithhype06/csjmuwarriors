// File: src/config/firebase.js
const admin = require('firebase-admin');

let serviceAccount;

// Agar app Render par chal rahi hai (RENDER env var automatically true hota hai)
if (process.env.RENDER) {
    // Render mounts secret files at this exact path:
    serviceAccount = require('/etc/secrets/serviceAccountKey.json');
} else {
    // Local laptop ke liye
    serviceAccount = require('../../serviceAccountKey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;