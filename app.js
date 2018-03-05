var startScreen = document.querySelector('#game-start');
var restartScreen = document.querySelector('#game-over');
var startBtn = document.querySelector('#start');
var restartBtn = document.querySelector('#restart');
var countryToFind = document.querySelector('.countryToFind');
var flagImg = document.querySelectorAll('.flag img');
var flag = document.querySelectorAll('.flag');
var lives = document.querySelectorAll('.lives img');
var names = [];


startBtn.addEventListener('click', function() {
  startScreen.classList.remove('is-open');
});

restartBtn.addEventListener('click', function() {
  restartScreen.classList.remove('is-open');
});

for (let i = 0; i < flagImg.length; i++) {
  var random = Math.floor(Math.random() * 100) + 1;
  var code = 'flags/' + flags[random].code.toLowerCase() + '.svg';
  var name = flags[random].name.trim();
  names.push(name);
  flagImg[i].src = code;
  flag[i].dataset.country = name;
  var test = Math.floor(Math.random() * 4);
  countryToFind.textContent = names[test];
  var lifeCount = 2;
  flag[i].addEventListener('click', function() {
    if (flag[i].dataset.country !== names[test]) {
      flag[i].classList.add('is-active');
      lives[lifeCount].classList.add('is-active');
      lifeCount--;
      if (lifeCount < 0) {
        restartScreen.classList.add('is-open');
      }
    }
  });
}
