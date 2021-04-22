exports.POST_DUMMY_DATA = Array.from({ length: 50 }).map((_, index) => {
  const number = index + 1;
  return {
    title: 'hello : ' + number,
    body: 'こんにちは : ' + number,
  };
});
