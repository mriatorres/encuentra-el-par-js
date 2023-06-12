

const section = document.querySelector("section");
const playerlivesCount = document.querySelector(".lives");
let playerLives = 7;
//Tiempo
let timeStart;
let timeInterval;

//Numero de nivel
let level = 1;
const playerLevel = document.querySelector(".level");

//link text
playerlivesCount.textContent = playerLives;
playerLevel.textContent = level;

//Empezar juego
function showGame(){
    divContain = document.querySelector(".container");
    divInit = document.querySelector(".init");
    divContain.classList.toggle('inactive');
    divInit.classList.toggle('inactive');
}

//Generate data [{}]
const getData = () => [
    { imgsrc: "https://img.freepik.com/free-photo/redeyed-tree-frog-closeup-leaves-redeyed-tree-frog-agalychnis-callidryas-closeup-branch_488145-3285.jpg?w=740&t=st=1685219486~exp=1685220086~hmac=9890dc85ea4759bfcaa6572c0e127c94645d57b706a00dd8c6db0ebbcf3a0013", name: "frog"},
    { imgsrc: "https://img.freepik.com/premium-photo/leopard-gecko-closeup-face-with-natural-background-leopard-gecko-closeup-head-animal-closeup_488145-3716.jpg", name:"gecko"},
    { imgsrc: "https://img.freepik.com/free-photo/beautiful-red-iguana-wood-animal-closeup_488145-3687.jpg?t=st=1685204169~exp=1685204769~hmac=869db979e937fab96e35536de5f9c7cd078687ee70799643ac9c3ea51c2d0823", name:"iguana"},
    { imgsrc: "https://img.freepik.com/premium-photo/wagler-s-pit-viper-tree-branch_266258-733.jpg", name:"pit_viper"},
    { imgsrc: "https://img.freepik.com/free-photo/closeup-galapagos-tortoise_53876-95391.jpg?t=st=1685219828~exp=1685220428~hmac=a529a3aa53ff428435fd690221f87c7da5026b98c158cbee8096438cfdcee76c", name:"turtle"},
    { imgsrc: "https://img.freepik.com/premium-photo/cockatoo-perched-branch_266258-1857.jpg", name: "cockatoo"},
    { imgsrc: "https://img.freepik.com/free-photo/redeyed-tree-frog-closeup-leaves-redeyed-tree-frog-agalychnis-callidryas-closeup-branch_488145-3285.jpg?w=740&t=st=1685219486~exp=1685220086~hmac=9890dc85ea4759bfcaa6572c0e127c94645d57b706a00dd8c6db0ebbcf3a0013", name: "frog"},
    { imgsrc: "https://img.freepik.com/premium-photo/leopard-gecko-closeup-face-with-natural-background-leopard-gecko-closeup-head-animal-closeup_488145-3716.jpg", name:"gecko"},
    { imgsrc: "https://img.freepik.com/free-photo/beautiful-red-iguana-wood-animal-closeup_488145-3687.jpg?t=st=1685204169~exp=1685204769~hmac=869db979e937fab96e35536de5f9c7cd078687ee70799643ac9c3ea51c2d0823", name:"iguana"},
    { imgsrc: "https://img.freepik.com/premium-photo/wagler-s-pit-viper-tree-branch_266258-733.jpg", name:"pit_viper"},
    { imgsrc: "https://img.freepik.com/free-photo/closeup-galapagos-tortoise_53876-95391.jpg?t=st=1685219828~exp=1685220428~hmac=a529a3aa53ff428435fd690221f87c7da5026b98c158cbee8096438cfdcee76c", name:"turtle"},
    { imgsrc: "https://img.freepik.com/premium-photo/cockatoo-perched-branch_266258-1857.jpg", name: "cockatoo"}
]

//randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card generator function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach(item =>{
        console.log(item);
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = item.imgsrc;
    card.setAttribute('name', item.name);
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
        card.classList.toggle('toggleCard');
        checkCards(e);
    })
 });

}
//Check cards
const checkCards = (e) => {
    const clickedcard = e.target;
    clickedcard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard')
    //Logic
    if(flippedCards.length === 2){
        if(
           flippedCards[0].getAttribute('name') === 
           flippedCards[1].getAttribute('name'))
           {
            console.log("match");
            flippedCards.forEach((card) => {card.classList.remove("flipped"),
            card.style.pointerEvents = 'none'}
            )
        }else{
            console.log("wrong");
            flippedCards.forEach(card=>{
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove("toggleCard"), 1000)
            });
            playerLives--;
            playerlivesCount.textContent = playerLives
            if(playerLives === 0){
                swal({title: "Perdiste...", text:"Buena suerte para la proxima..."})
                .then((value) => {
                 location.reload();
});
            }
        }
    }
    //Run a check to see if we won the level
    if(toggleCard.length > 11){
        restart(setTimeout(swal({title:"¡Superaste el nivel!", text:"¡Felicitaciones! presiona ok para continuar"})), 1000)
        .then((value) => {
            location.reload();
        });
    }

    //Run a check to see if we won the game
    if(level === 4){
        // swal({title:"¡Ganaste!", text:"¡Felicitaciones! superaste todos los niveles"})
        let divWin = document.querySelector(".winner");
        divWin.classList.remove("inactive");
        divContain = document.querySelector(".container");
        divContain.classList.add('inactive');
    }
};

//Restart 2 level
const restart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove('toggleCard');
        //randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
        faces[index].src = item.imgsrc;
        cards[index].setAttribute('name', item.name)
        section.style.pointerEvents = "all";
    }, 1000)
    });
    level++;

    console.log(level);
    playerLives = 7;
    if(!playerLives <=0){
        playerLives--;
    }
    playerlivesCount.textContent = playerLives;
    playerLevel.textContent = level;
    //setTimeout(() => window.alert(text), 1000)
}




cardGenerator();

/**'gecko': "url('https://img.freepik.com/premium-photo/leopard-gecko-closeup-face-with-natural-background-leopard-gecko-closeup-head-animal-closeup_488145-3716.jpg')",
        'iguana': "url('https://img.freepik.com/free-photo/beautiful-red-iguana-wood-animal-closeup_488145-3687.jpg?t=st=1685204169~exp=1685204769~hmac=869db979e937fab96e35536de5f9c7cd078687ee70799643ac9c3ea51c2d0823')",
        'pit_viper': "url('https://img.freepik.com/premium-photo/wagler-s-pit-viper-tree-branch_266258-733.jpg')",
        'turtle': "url('https://img.freepik.com/free-photo/closeup-galapagos-tortoise_53876-95391.jpg?t=st=1685219828~exp=1685220428~hmac=a529a3aa53ff428435fd690221f87c7da5026b98c158cbee8096438cfdcee76c')",
        'cockatoo': "url('https://img.freepik.com/premium-photo/cockatoo-perched-branch_266258-1857.jpg')"
      }, */
