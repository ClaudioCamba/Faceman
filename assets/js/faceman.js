var stored = '';
var correct = '';
var wrong = '';

// background colour function --------------------------------------------------------------
function backGround() {
  var indx = $('.rightBar span').length + 1;
  var dark = ['#c08431','#be772e','#bb6b2a','#b95e27','#b65123','#b2381d','#af2b19','#ad1e16','#aa1212'];
  if ($('.wordBar .ques').length === 0){
    indx = 0;
  }
  return $('.img').css('background','radial-gradient(circle,#fdd531 0%,'+dark[indx]+' '+indx+'0%, #fdd531 100%)');
}
// audio function --------------------------------------------------------------
function soundPlay(audio) {
    return document.querySelector(audio).play();
}
// Hide Placeholders on focus --------------------------------------------------
$('input,text').focus(function() {
  $(this).data('placeholder', $(this).attr('placeholder'))
    .attr('placeholder', '');
}).blur(function() {
  $(this).attr('placeholder', $(this).data('placeholder'));
});
// Disable Numbers & Spec Char -------------------------------------------------
$('input').on('input', function() {
  var c = this.selectionStart,
    r = /[^a-zA-Z]/gi,
    v = $(this).val();
  if (r.test(v)) {
    $(this).val(v.replace(r, ''));
    c--;
  }
  this.setSelectionRange(c, c);
});
// Enter Key Activates Event ---------------------------------------------------
$('#playInput').keyup(function(event) {
  if (event.keyCode === 13) {
    $('#playBtn').click();
  }
});
$('#guessInput').keyup(function(event) {
  if (event.keyCode === 13) {
    $('#guessBtn').click();
  }
});
// play button -----------------------------------------------------------------
$('#playBtn').on("click", function() {
  if ($('#playInput').val().length !== 0) {
    var hold = '';
    for (var i = 0; i < playInput.value.length; i++) {
      hold += '<span class="ques">?</span>';
    }
    soundPlay('.audBegin');
    $('.wordBar').html(hold);
    $('.play').hide();
    $('.guess').show();
    stored = playInput.value.toUpperCase();
    $('#playInput').val('');
    $('#guessInput,#guessBtn').show();
    $('#guessInput').focus();
  } else {
    // if word input section is empty
    $('#playInput').addClass('error1');
    setTimeout(function() {
      $('#playInput').removeClass('error1');
    }, 500);
    soundPlay('.audMisc');
  }
});
// guess button ----------------------------------------------------------------
$('#guessBtn').on("click", function() {
  if ($('#guessInput').val().length !== 0) {
    var guess = guessInput.value.toUpperCase();
    if (stored.indexOf(guess) >= 0 && correct.indexOf(guess) < 0) {
      for (var i = 0; i < stored.length; i++) {
        if (stored.charAt([i]) === guess) {
          $(".wordBar span").eq([i]).text(guess).removeClass('ques');
          correct += guess;
          if($('.wordBar .ques').length > 0){
          soundPlay('.audCorrect');
          }
        }
      }
    } else if (correct.indexOf(guess) === -1 && wrong.indexOf(guess) === -1) {
      wrong += guess;
      backGround();
      $('.life').eq([0]).removeClass('life');
      $('<span>' + guess + '</span>').appendTo('.rightBar');
      $('.img-fluid').attr('src', 'assets/img/pic' + $('.rightBar span').length + '.png');
      if ($('.life').length !== 0) {
      soundPlay('.audIncorrect');
  }
    } else {
      $('.rightBar').addClass('error2');
      setTimeout(function() {
        $('.rightBar').removeClass('error2');
      }, 500);
      soundPlay('.audMisc');
    }
  } else {
    // if word input section is empty
    $('#guessInput').addClass('error1');
    setTimeout(function() {
      $('#guessInput').removeClass('error1');
    }, 500);
    soundPlay('.audMisc');
  }
  if ($('.life').length === 0) {
    $('#guessInput,#guessBtn').hide();
    $('h1').addClass('lose').text('You Lose');
    $('.rightBar span').addClass('letrGr');
    $('.leftBar').toggleClass('yelBar GrBar');
    $('.rightBar').toggleClass('redBar GrBar');
    soundPlay('.audLose');
  } else if ($('.wordBar .ques').length === 0) {
    $('#guessInput,#guessBtn').hide();
    $('h1').addClass('win').text('You Win');
    $('.leftBar').toggleClass('yelBar GrBar');
    $('.rightBar').toggleClass('redBar GrBar');
    $('.life').toggleClass('life lifeGr');
    $('.img-fluid').attr('src', 'assets/img/pic9.png');
    $('.rightBar span').addClass('letrGr');
    soundPlay('.audWin');
    backGround();
  }
  $('#guessInput').focus();
  $('#guessInput').val('');
});

$('#resetBtn').on("click", function() {
  $('.img-fluid').attr('src','assets/img/pic0.png');
  $('h1').removeClass('win lose').text('Faceman');
  $('.rightBar span,.wordBar span').remove();
  $('.guess,.play').toggle();
  $('.leftBar span').removeClass('lifeGr').addClass('life');
  $('.leftBar').addClass('yelBar').removeClass('GrBar');
  $('.rightBar').addClass('redBar').removeClass('GrBar');
  soundPlay('.audRestart');
  backGround();
  correct = '';
  wrong = '';
  stored = '';
  });
