const urlQuote = "https://api.quotable.io/random";
const quoteElement = document.getElementById('display-phrase')
const inputElement = document.getElementById('type-input');
const button = document.getElementById('btn-quote');
const timerElement = document.getElementById('timer');

//loop for type check in
const checkLetters = () =>{
    const letters = quoteElement.querySelectorAll('span')
    const keyUp = inputElement.value.split('')
    let task =true;
    letters.forEach((charSpan, index)=>{
        const charToEvaluate = keyUp[index]
        if (charToEvaluate ==null){
            charSpan.classList.remove('incorrect')
            charSpan.classList.remove('correct')
            task = false;
        } else if (charToEvaluate === charSpan.innerText){
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
            
        }else{
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
            task = false;
        }
    })
    if(task)renderNewContent()
}
inputElement.addEventListener('input', checkLetters)

function getRandomQuote(){
    return fetch(urlQuote)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewContent(){
    const quoteContent = await getRandomQuote()
    quoteElement.innerHTML = '';
    
    quoteContent.split('').forEach(character => {
        const charSpan = document.createElement('span');
        charSpan.innerText=character
        quoteElement.appendChild(charSpan)
    });
    inputElement.value =null;
    startTimer();
}

renderNewContent()

button.addEventListener('click', renderNewContent)

//current day, enhacing accuracy of timer
let startTime
function startTimer(){
    timerElement.innerText=0
    startTime = new Date()
    setInterval(()=>{
        timerElement.innerText= getTimerTime()
    }, 1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000)
}