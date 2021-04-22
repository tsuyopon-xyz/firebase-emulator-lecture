const admin = require('firebase-admin');
admin.initializeApp();

const collection = admin.firestore().collection('posts');

exports.fetchPosts = async () => {
  const snapShot = await collection.get();
  const storedPosts = snapShot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    };
  });

  return storedPosts;
};

exports.createPost = async ({ title, body }) => {
  if (!title) {
    throw new Error('titleは必須です');
  }
  if (!body) {
    throw new Error('bodyは必須です');
  }

  const docRef = await collection.add({
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
