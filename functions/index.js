const functions = require('firebase-functions');
const admin = require('firebase-admin');

// https://cloud.google.com/functions/docs/writing/http?hl=ja#preflight_request
// https://stackoverflow.com/questions/42755131/enabling-cors-in-cloud-functions-for-firebase
// https://qiita.com/seya/items/0f12bd09c8e856123bc3
const cors = require('cors')({ origin: true });
admin.initializeApp();

const postsCollection = admin.firestore().collection('posts');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.fetchPosts = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    functions.logger.info('Called the fetchPosts');

    if (request.method !== 'GET') {
      response.status(400).json({
        message: 'このAPIはHTTPメソッドGETのみ受け付けています',
      });
      return;
    }

    try {
      const snapShot = await postsCollection.get();
      const storedPosts = snapShot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });

      response.json(storedPosts);
    } catch (error) {
      response.status(500).json({
        message: 'Something error happened.',
      });
    }
  });
});

exports.createPost = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
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
      response.status(400).json({
        message: error.message,
      });
    }
  });
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
