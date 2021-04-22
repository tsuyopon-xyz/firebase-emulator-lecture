if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log('FIRESTORE_EMULATOR_HOST is running!');
  console.log('Seed data to firestore emulator.');
  const { POST_DUMMY_DATA } = require('./post-data');
  const { createPost, fetchPosts } = require('../services/PostService');

  const seedPostData = async () => {
    const storedPosts = await fetchPosts();
    if (storedPosts.length > 0) {
      // 既にデータが追加されていたら追加でダミーデータを入れないようにする
      return;
    }

    const addPostPromises = POST_DUMMY_DATA.map((data) => {
      return createPost(data);
    });
    await Promise.all(addPostPromises);
    console.log('Done seeding data to firestore emulator.');
  };
  seedPostData();
} else {
  console.log('FIRESTORE_EMULATOR_HOST is not running');
}
