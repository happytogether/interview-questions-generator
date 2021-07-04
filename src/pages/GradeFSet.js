function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const GradeFSet = () => {
  const arr = [
    '/img/gradeF/1.svg',
    '/img/gradeF/2.svg',
    '/img/gradeF/3.svg',
    '/img/gradeF/4.svg',
    '/img/gradeF/5.svg',
    '/img/gradeF/6.svg',
    '/img/gradeF/7.svg',
    '/img/gradeF/8.svg'
  ]
  return shuffle(arr);
};

export { GradeFSet }
