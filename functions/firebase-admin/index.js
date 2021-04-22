const admin = require('firebase-admin');
admin.initializeApp();

exports.firestore = admin.firestore;
