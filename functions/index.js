const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const cors = require("cors")({origin: true});
cors;
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const urlBackend = "https://us-central1-fir-99b86.cloudfunctions.net/";
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
