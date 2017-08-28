var keyActive;
var canvas = document.getElementById('hangman');
var context = canvas.getContext("2d");
var Q = document.getElementById("Q");
var W = document.getElementById("W");
var E = document.getElementById("E");
var R = document.getElementById("R");
var T = document.getElementById("T");
var Y = document.getElementById("Y");
var U = document.getElementById("U");
var I = document.getElementById("I");
var O = document.getElementById("O");
var P = document.getElementById("P");
var A = document.getElementById("A");
var S = document.getElementById("S");
var D = document.getElementById("D");
var F = document.getElementById("F");
var G = document.getElementById("G");
var H = document.getElementById("H");
var J = document.getElementById("J");
var K = document.getElementById("K");
var L = document.getElementById("L");
var Z = document.getElementById("Z");
var X = document.getElementById("X");
var C = document.getElementById("C")
var V = document.getElementById("V");
var B = document.getElementById("B");
var N = document.getElementById("N");
var M = document.getElementById("M");
var wordDisplay = document.getElementById('word_display');
var list = [{word:'serpant', hint_1:'Another name for snake', hint_2:'Can be very big'}, 
           {word:'automobile', hint_1:'Takes you where you want to go', hint_2: 'Has four wheels'}, 
           {word:'chocolate', hint_1:'this tastes sweet', hint_2: 'It can also be dark'},
           {word:'gorilla', hint_1:'Lives in Africa', hint_2: 'Can have silver on its back'},
           {word:'helicopter', hint_1:'Travels very fast', hint_2: 'It flies with no wings'},
           {word:'mountain', hint_1:'This can be climbed', hint_2: 'It comes in ranges'},
           {word:'horse', hint_1:'Carries cowboys', hint_2: 'Lives out West'},
           {word:'tugboat', hint_1:'Carries things much larger than itself', hint_2: 'It cannot move out of water'},
           {word:'lightbulb', hint_1:'Needs electricity to shine', hint_2: 'It gets shaken to see if it works'},
           {word:'jupiter', hint_1:'Spins far away from the sun', hint_2: 'has a spot three Earths wide'}]; 
 var alphaArr = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];
 var wrongAlpha = [];
 var word;
var wordArr;
var badGuess = 7;
  var letterSpaces = '';
var goodGuess;

function newGame(){
  wordObj = list[Math.floor(Math.random() * list.length)];
  word = wordObj.word;
  wordArr = word.split('');
  wordBoxLength(wordArr);
  goodGuess = wordArr.length;
  var hint_1 = document.getElementById('hint_1');
  var hint_2 = document.getElementById('hint_2');
  hint_1.innerHTML = wordObj.hint_1;
  hint_2.innerHTML = wordObj.hint_2;
  hint_1.addEventListener("click", function(){
    hint_1.style.background = '#fff';
  });
  hint_2.addEventListener("click", function(){
    hint_2.style.background = '#fff';
  });
  
}

function reset(){
  badGuess = 7;
  letterSpaces = '';
  wrongAlpha = [];
  wordDisplay.innerHTML = '';
  context.clearRect(100, 65, 100, 265);
  $('.key').removeAttr("style");
  goodGuess = wordArr.length;
  newGame();
}
  
  //use .keys to play
  function clickKey(k){
    for(var i=0; i<alphaArr.length; i++){
      if(k.toUpperCase() === alphaArr[i].innerHTML){
        k = k.toLowerCase();
        if(wrongAlpha.includes(k) === false){
          wrongAlpha.push(k);
          var regex = new RegExp(k.toLowerCase());
          if(regex.test(word) === true){
            $(alphaArr[i]).css({'background':'#bcbcbc','box-shadow':'5px 0px 5px 0px #adadad, 0px 6px 0px 6px #b5b3b3, 0px 6px 0px 7px #444'});
            addLetter(k);
            goodGuess = goodGuess - 1;
            if(goodGuess === 1){
              alert("congrats");
              reset();
            }
          } else {
          $(alphaArr[i]).css({'background':'#e07d7d','box-shadow':'5px 0px 5px 0px #d17575, 0px 6px 0px 6px #ce6b6b, 0px 6px 0px 7px #a55757','border-color':'#a55757'});
            badGuess = badGuess - 1;
            addParts(badGuess);
          }
        }
      }//end of if statement
    }//end of for loop
  }

// use keyboard to guess letters
$(document).on("keypress", function(e){
  keyActive = String.fromCharCode(e.which);
  clickKey(keyActive);
});
  
  //add letter spaces to display
  function wordBoxLength(w){
  for(var i=0; i<w.length; i++){  
    letterSpaces += '<div class="letter"></div>';
  }
  wordDisplay.innerHTML = letterSpaces;
}

  //add letter to display
function addLetter(letter){
  for(var n=0; n<wordArr.length; n++){
    if(wordArr[n] === letter){
      var correct = document.getElementById('word_display').getElementsByClassName('letter')[n];
      correct.innerHTML = letter;
    }
  }
}

//adds body parts when incorrect
function addParts(num){
  switch(num){
    case 6:
      head();
      break;
    case 5:
      back();
      break;
    case 4:
      leftArm();
      break;
    case 3:
      rightArm();
      break;
    case 2:
      rightLeg();
      break;
    case 1:
      leftLeg();
      alert("Game Over");
      reset();
      break;
            }
}

// hangman's structure
//rope
context.beginPath();
context.lineWidth = 10;
context.strokeStyle = '#844204';
context.moveTo(150,30);
context.lineTo(150,70);
//horizontal arm
context.moveTo(25,30);
context.lineTo(155,30);
//vertical pole
context.moveTo(30,30);
context.lineTo(30,370);
// horizontal base
context.moveTo(25,370);
context.lineTo(270,370);
context.stroke();

//canvas body parts to be added
function head(){
  context.beginPath();
  context.strokeStyle = '#000';
  context.arc(150, 100, 30, 0, 2 * Math.PI);
  context.stroke();
}

function back(){
  context.beginPath();
  context.strokeStyle = '#000';
  context.moveTo(150,130);
  context.lineTo(150,240);
  context.stroke();
}

function leftArm(){
  context.beginPath();
  context.strokeStyle = '#000';
  context.moveTo(150,140);
  context.lineTo(110,230);
  context.stroke();
}

function rightArm(){
  context.beginPath();
  context.strokeStyle = '#000';
  context.moveTo(150,140);
  context.lineTo(190,230);
  context.stroke();
}

function leftLeg(){
  context.beginPath();
  context.strokeStyle = '#000';
  context.moveTo(150,240);
  context.lineTo(120,330);
  context.stroke();
}

function rightLeg(){
  context.beginPath();
  context.strokeStyle = '#000';
  context.moveTo(150,240);
  context.lineTo(180,330);
  context.stroke();
}
  
newGame();