const ref={
    startChangeColorBtn: document.querySelector('[data-start]'),
    stopChangeColorBtn: document.querySelector('[data-stop]'),
}

let timerId=null;
const COLOR_CHANGE_DELAY = 1000;

ref.stopChangeColorBtn.setAttribute('disabled', true)

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startChangeColorHendler=()=>{
    timerId =setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor();
        console.log(`${Date.now()} время вейчас через 1 секунду`)
    },COLOR_CHANGE_DELAY)
    ref.startChangeColorBtn.setAttribute('disabled', true);
    ref.stopChangeColorBtn.removeAttribute('disabled');   

}
const stopChangeColorHendler=()=>{
    clearInterval(timerId);
    ref.startChangeColorBtn.removeAttribute('disabled');
    ref.stopChangeColorBtn.setAttribute('disabled', true);
}



ref.startChangeColorBtn.addEventListener('click',startChangeColorHendler)
ref.stopChangeColorBtn.addEventListener('click',stopChangeColorHendler)