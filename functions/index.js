const functions = require('firebase-functions');
// https://cloud.google.com/functions/docs/writing/http?hl=ja#preflight_request
// https://stackoverflow.com/questions/42755131/enabling-cors-in-cloud-functions-for-firebase
// https://qiita.com/seya/items/0f12bd09c8e856123bc3
const cors = require('cors')({ origin: true });
const { fetchPosts, createPost } = require('./services/PostService');

if (process.env.FIRESTORE_EMULATOR_HOST) {
  // ダミーデータ投入処理をする
  require('./firestore/seeder');
}

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
      const storedPosts = await fetchPosts();

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
