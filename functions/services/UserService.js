const { firestore } = require('../firebase-admin');
const collection = firestore().collection('users');

exports.saveUser = async (user) => {
  try {
    await collection.doc(user.uid).set({
      id: user.uid,
      email: user.email,
      // createdAt: firestore.FieldValue.serverTimestamp(),
      // その他アプリ内で利用するユーザー情報を保持
    });
  } catch (error) {
    console.error(error);
  }
};
