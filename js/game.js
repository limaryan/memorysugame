const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'amethyst',
    'bismuth',
    'coolkids',
    'connie',
    'diamonds',
    'garnet',
    'greg',
    'jasper',
    'lapis',
    'larsesadie',
    'lion',
    'onion',
    'pearl',
    'peridot',
    'steven',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCard = document.querySelectorAll('.disabledCard');

    if(disabledCard.length == 30) {
        clearInterval(this.loop);
        alert(`Ótimo trabalho salvando o UNIVERSO ${spanPlayer.innerHTML} !!!! *-* Seu tempo foi de: ${timer.innerHTML}`);
        
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('DataCharacter');
    const secondCharacter = secondCard.getAttribute('DataCharacter');
   
    if (firstCharacter == secondCharacter){

       firstCard.firstChild.classList.add('disabledCard');
       secondCard.firstChild.classList.add('disabledCard');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('RevealCard');
            secondCard.classList.remove('RevealCard');

            firstCard = '';
            secondCard = '';

            }, 500);
    }
}

const revealCard = ({ target }) => {
 
    if (target.parentNode.className.includes('RevealCard')) {
    return;
  }

    if (firstCard == '') {
        
        target.parentNode.classList.add('RevealCard');
        firstCard = target.parentNode;

    } else if (secondCard == '') {

        target.parentNode.classList.add('RevealCard');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (character) => {

    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('DataCharacter', character)

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        
        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () => {

    this.loop = setInterval(()=>{

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    },1000);

}

window.onload = () =>{

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();

}

