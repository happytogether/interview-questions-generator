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

const GradeASet = () => {
  const arr = [
    '/img/gradeA/1.svg',
    '/img/gradeA/2.svg',
    '/img/gradeA/3.svg',
    '/img/gradeA/4.svg',
    '/img/gradeA/5.svg',
    '/img/gradeA/6.svg',
    '/img/gradeA/7.svg'
  ]
  return shuffle(arr);
};

export { GradeASet }
