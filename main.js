var ui = {
  gameover_screen: document.querySelector('#game-over'),
  restart_btn: document.querySelector('#game-over button'),
  start_screen: document.querySelector('#game-start'),
  start_btn: document.querySelector('#game-start button'),
  time_left: document.querySelector('.time span'),
  flags: document.querySelectorAll('.flag'),
  flags_img: document.querySelectorAll('.flag img'),
  title: document.querySelector('.countryToFind'),
  lives: document.querySelectorAll('.lives img'),
  score: document.querySelector('.score strong')
}

var flags_copy = flags.slice();
var time_left = 20;
var time_id;
var life_left = 3;
var random_flags;
var flag_to_find;
var points = 0;
var game_over = false;

ui.start_btn.addEventListener('click', function() {
  startGame();
  setEvents();
  ui.start_screen.classList.remove('is-open');
});

ui.restart_btn.addEventListener('click', function() {
  time_left = 20;
  life_left = 3;
  points = 0;
  flags = flags_copy.slice();
  game_over = false;
  startGame();
  ui.time_left.textContent = time_left;
  ui.score.textContent = 0;
  for (var i = 0; i < ui.lives.length; i++) {
    ui.lives[i].classList.remove('is-active');
  }
  ui.gameover_screen.classList.remove('is-open');
});

function setEvents() {
  for (let i = 0; i < ui.flags.length; i++) {
    ui.flags[i].addEventListener('click', function () {
      if (game_over === true) {
        return;
      }
      if (ui.flags[i].classList.contains('is-active')) {
        return;
      }
      if (flag_to_find.name === random_flags[i].name) {
        addPoints();
        renderFlags();
      } else {
        ui.flags[i].classList.add('is-active');
        removeLife();
      }
    });
  }
}

function startGame() {
  startTimer();
  renderFlags();
}

function renderFlags() {
  var random = Math.floor(Math.random() * flags.length );
  flag_to_find = flags[random];
  flags = flags.filter(function (flag) {
    return flag.name !== flag_to_find.name;
  });

  random_flags = [];

  for (var i = 0; i < 3; i++) {
    random = Math.floor(Math.random() * flags.length );
    random_flags.push(flags[random]);
  }
  random_flags.push(flag_to_find);
  random_flags = shuffle(random_flags);

  ui.title.textContent = flag_to_find.name;
  for (var i = 0; i < ui.flags.length; i++) {
    var code = random_flags[i].code.toLowerCase();
    ui.flags_img[i].src = 'flags/' + code + '.svg';
    ui.flags[i].classList.remove('is-active');
  }
}

function startTimer() {
  time_id = setInterval(function() {
    time_left--;
    ui.time_left.textContent = time_left;
    if(time_left === 0) {
      gameOver();
      return;
    }
  }, 1000);
}

function removeLife() {
  life_left--;
  if (life_left <= 0) {
    gameOver();
    return;
  }
  ui.lives[life_left].classList.add('is-active');
}

function addPoints() {
  points++;
  time_left += 5;
  if (time_left > 30) {
    time_left = 30;
  }
  ui.score.textContent = points;
}

function shuffle(tab_to_shuffle) {
  var random,
      old;

  for (var i = 0; i < tab_to_shuffle.length; i++) {
    random = Math.floor(Math.random() * tab_to_shuffle.length );
    old = tab_to_shuffle[random];
    tab_to_shuffle[random] = tab_to_shuffle[i];
    tab_to_shuffle[i] = old;
  }
  return tab_to_shuffle;
}

function gameOver() {
  game_over = true;
  ui.gameover_screen.classList.add('is-open');
  clearInterval(time_id);
}
