const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { database } = require('firebase-admin');
admin.initializeApp();

const postsCollection = admin.firestore().collection('posts');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.fetchPosts = functions.https.onRequest((request, response) => {
  functions.logger.info('Called the fetchPosts');

  if (request.method !== 'GET') {
    response.status(400).json({
      message: 'このAPIはHTTPメソッドGETのみ受け付けています',
    });
    return;
  }

  response.json({
    message: 'This is fetchPosts',
  });
});

exports.createPost = functions.https.onRequest(async (request, response) => {
  functions.logger.info('Called the createPost');

  if (request.method !== 'POST') {
    response.status(400).json({
      message: 'このAPIはHTTPメソッドPOSTのみ受け付けています',
    });
    return;
  }

  try {
    const { title, body } = request.body;
    const savedData = await createPost({ title, body });

    response.json({ ...savedData });
  } catch (error) {
    response.json({
      message: error.message,
    });
  }
});

const createPost = async ({ title, body }) => {
  if (!title) {
    throw new Error('titleは必須です');
  }
  if (!body) {
    throw new Error('bodyは必須です');
  }

  const docRef = await postsCollection.add({
    title,
    body,
    // createdAt: admin.firestore.FieldValue.serverTimestamp,
  });

  const snapShot = await docRef.get();
  const data = snapShot.data();

  return {
    id: snapShot.id,
    title: data.title,
    body: data.body,
  };
};
