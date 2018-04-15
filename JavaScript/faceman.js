/*jshint esversion: 6 */
// -------------------------------------------------------------
// -------------Variables & Element Selectors-------------------
var underLine = '';
var store = '';
var correct = '';

var audCorrect = document.getElementById("audCorrect");
var audIncorrect = document.getElementById("audIncorrect");
var audWin = document.getElementById("audWin");
var audLose = document.getElementById("audLose");
var audBegin = document.getElementById("audBegin");

const health = document.querySelectorAll('.health-bar');
const image = document.querySelector('#img');
const wrong = document.querySelector('#wrong');

const entryInput = document.querySelector('#entryInput');
const submitBtn = document.querySelector('#submit-btn');

const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guessInput');

const theWord = document.querySelector('#wordPreview');
const title = document.querySelector('#title');
// --------------------------------------------------------------
// ------------------Disable Numbers & Spec Char----------------
$('input').on('input', function() {
  var c = this.selectionStart,
      r = /[^a-zA-Z]/gi,
      v = $(this).val();
  if(r.test(v)) {
    $(this).val(v.replace(r, ''));
    c--;
  }
  this.setSelectionRange(c, c);
});
// ------------------------------------------------------------
// -------------Hide Placeholders on focus---------------------
$('input,text').focus(function() {
  $(this).data('placeholder', $(this).attr('placeholder'))
    .attr('placeholder', '');
}).blur(function() {
  $(this).attr('placeholder', $(this).data('placeholder'));
});
// -------------------------------------------------------------
// -----------------Enter Key Activates Event-------------------
$(entryInput).keyup(function(event) {
  if (event.keyCode === 13) {
    $(submitBtn).click();
  }
});
$(guessInput).keyup(function(event) {
  if (event.keyCode === 13) {
    $(guessBtn).click();
  }
});
// -------------------------------------------------------------
// ---------------------Submit word button----------------------
submitBtn.addEventListener('click', function() {

  if (theWord.innerHTML.length === 0 && entryInput.value.length > 0) {
    for (var i = 0; i < entryInput.value.length; i += 1) {
      underLine += '<span class="redash">' + '_' + '</span>';
    }
    store += entryInput.value.toUpperCase();

    theWord.innerHTML = underLine;
    entryInput.value = '';
    guessInput.value = '';

    $('.guess').show();
    $('.submit').hide();
    guessInput.focus();
    audBegin.play();
  }
});
// ------------------------------------------------------------
// --------------------Guess word button-----------------------
guessBtn.addEventListener('click', function() {

  var guess = guessInput.value.toUpperCase();

  if (store.indexOf(guess) >= 0 && correct.indexOf(guess) < 0) {

    for (var i = 0; i < store.length; i += 1) {
      if (store.charAt([i]) === guess) {
        correct += guess;
        $("h2 span").eq([i]).removeClass("redash");
        $("h2 span").eq([i]).html(guess);
      }
    }
    if (correct.length < store.length) {
    audCorrect.play();
    }
  } else if (correct.indexOf(guess) < 0 && wrong.textContent.indexOf(guess) < 0) {
    wrong.innerHTML += guess;
    if (wrong.textContent.length < 8){
      audIncorrect.play();
    } else {
      audLose.play();
    }
  }
// ------------------------------------------------------------
// --------------------Attempts & Face Emotion------------------
  if (wrong.textContent.length === 7) {
    image.src = 'IMG/pic7.png';
    $(health[6]).removeClass("health-appear").addClass("health-disappear");
  } else if (wrong.textContent.length === 6) {
    image.src = 'IMG/pic6.png';
    $(health[5]).removeClass("health-appear").addClass("health-disappear");
  } else if (wrong.textContent.length === 5) {
    image.src = 'IMG/pic5.png';
    $(health[4]).removeClass("health-appear").addClass("health-disappear");
  } else if (wrong.textContent.length === 4) {
    image.src = 'IMG/pic4.png';
    $(health[3]).removeClass("health-appear").addClass("health-disappear");
  } else if (wrong.textContent.length === 3) {
    image.src = 'IMG/pic3.png';
    $(health[2]).removeClass("health-appear").addClass("health-disappear");
  } else if (wrong.textContent.length === 2) {
    image.src = 'IMG/pic2.png';
    $(health[1]).removeClass("health-appear").addClass("health-disappear");
  } else if (wrong.textContent.length === 1) {
    image.src = 'IMG/pic1.png';
    $(health[0]).removeClass("health-appear").addClass("health-disappear");
  }

  if (wrong.textContent.length === 8) {
    title.innerHTML = 'YOU LOSE!';
    image.src = 'IMG/pic8.png';
    $(health[7]).removeClass("health-appear").addClass("health-disappear");
    $("#guessInput, #guess-btn").addClass("hide");
    $(".left-bar , .right-bar").addClass("grey-bars");
    $("header h1").removeClass("top").addClass("lose");
  }
// ----------------------------------------------------------------
// --------------------Positive Face Emotion-----------------------
  if (correct.length === store.length) {

    title.innerHTML = 'YOU WIN!';
    image.src = 'IMG/pic9.png';
    audWin.play();
    $("#guessInput, #guess-btn").addClass("hide");
    $(".left-bar , .right-bar").addClass("grey-bars");
    $(health).removeClass("health-appear").addClass("health-grey");
    $("header h1").removeClass("top").addClass("win");
  }

  guessInput.value = '';
  guessInput.focus();
});
