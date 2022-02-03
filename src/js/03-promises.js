
import Notiflix from 'notiflix';
const dataPromiseForm =document.querySelector('.form');

const createPromise=(position, delay)=>{
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      if(shouldResolve){        
        resolve({position, delay});
      }
      else{
        reject({position, delay});
      }
    },delay);    
  });
}

const createPromiseHandler=(e)=>{
  e.preventDefault();
  const { elements } = e.currentTarget;

  let delay=+elements.delay.value,
      step=+elements.step.value,
      amount=+elements.amount.value;

  for(let i=0;i<+amount;i+=1){
    
    createPromise(i,delay)
    .then(({ position, delay })=>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
    })
    .catch(({ position, delay })=>{
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
    });
    delay+=step;
  }
}

dataPromiseForm.addEventListener('submit', createPromiseHandler);

