function ageInDays(){
    var birthYear = prompt('What year were you born ???');
    var ageInDays = (2021-birthYear) * 365;
    var h1 = document.createElement('h1')
    var textanswer = document.createTextNode('You are ' + ageInDays + ' days old.');
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textanswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

function genrateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = 'https://thecatapi.com/api/images/get?format=src&type=gif&size=small';
    div.appendChild(image);
}

function rpsGame(yourChoice){
    var humanChoice,botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    var results = decideWinner(humanChoice,botChoice);
    var message = finalMessage(results);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
   var rspDatabase={ 
       'rock': {'scissors':1,'rock':0.5,'paper':0},
       'paper': {'rock':1,'paper':0.5,'scissors':0},
       'scissors': {'paper':1,'scissors':0.5,'rock':0}
   };

   var yourScore = rspDatabase[yourChoice][computerChoice];
   var computerScore = rspDatabase[computerChoice][yourChoice];

   return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]){
    if (yourScore === 0){
        return {'message':'You lost!', 'color':'red'};
    }
    else if(yourScore === 0.5){
        return {'message':'You tied!', 'color':'yellow'};
    }
    else {
        return {'message':'You won!', 'color':'green'};
    }
    
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imagesDatabase = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    } ;

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='"+imagesDatabase[humanImageChoice] +"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50,  233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding:30px;'>" + finalMessage['message'] +"</h1>" 
    botDiv.innerHTML = "<img src='"+imagesDatabase[botImageChoice] +"'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38,24, 1);'>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];

for (let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    }
    
    else if (buttonThingy.value === 'green'){
        buttonsGreen();
    }
    
    else if (buttonThingy.value === 'reset'){
        buttonsColorReset();
    }
    
    else if (buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for (let i=0; i < all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0; i < all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorReset(){
    for (let i=0; i < all_buttons.length ; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices = ["btn-primary", "btn-danger", "btn-success","btn-warning"];
    
    for (let i=0; i < all_buttons.length ; i++){
        var random_choices = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[random_choices]);
    }
}

let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards': ['2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','K.png','J.jpeg','Q.jpg','A.png'],
    'cardsMap':{'2.png':2,'3.png':3,'4.png':4,'5.png':5,'6.png':6,'7.png':7,'8.png':8,'9.png':9,'10.png':10,'K.png':10,'J.jpeg':10,'Q.jpg':10,'A.png':[11,0]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('./Sounds/swish.mp3');
const winSound = new Audio('./Sounds/cash.mp3');
const lossSound = new Audio('./Sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(YOU,card);
        updateScore(YOU,card);
        showScore(YOU);
    }
}

function showCard(activePlayer,card) {
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `./IMG/${card}`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    // let winner = computeWinner();
    // showResult(winner);
    if (blackjackGame['turnsOver'] === true){
        
        blackjackGame['isStand'] = false ;
        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');
        
        for (let i=0;i<yourImage.length;i++) {
            yourImage[i].remove();
        }
        
        for (let i=0;i<dealerImage.length;i++) {
            dealerImage[i].remove();
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = '#000';
        blackjackGame['turnsOver'] = true;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()* 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(activePlayer,card){
    if (card === 'A.png'){
        if (activePlayer['score'] += blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function dealerLogic(){
    blackjackGame['isStand'] = true;
    
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(DEALER,card);
        updateScore(DEALER,card);
        showScore(DEALER);
        await sleep(1000)
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function computeWinner(){
    let winner;

    if (YOU['score'] <= 21){
        if (YOU['score'] > DEALER['score']  || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score'] ){
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
        }
    }

    else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    }
    
    else if (YOU['score'] > 21  && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message,messageColor;

    if (blackjackGame['turnsOver'] === true){

        if (winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        }
        
        else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        }
        
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';    
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
    
}