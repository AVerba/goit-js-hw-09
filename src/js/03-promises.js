
import Notiflix from 'notiflix';
const dataPromiseForm =document.querySelector('.form');


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return promise= new Promise((res, reject)=>{
    setTimeout(()=>{
      if (shouldResolve) {
        // Fulfill
      } else {
        // Reject
      }
    },delay)
  })
 
}

const createpromiseHandler=(e)=>{
  e.preventDefault();

  const { elements } = e.currentTarget,
        { delay, step, amount } = elements;
        
  console.log(+delay.value, +step.value, +amount.value);
}


dataPromiseForm.addEventListener('submit', createpromiseHandler)