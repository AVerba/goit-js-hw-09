import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { checkBtnStatus } from './checkBtnStatus';
import {convertMs} from './convertMs';
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0]<=options.defaultDate){
      Notiflix.Notify.failure('Please choose a date in the future')
      return;
    }
    const time=convertMs(selectedDates[0]-options.defaultDate);
    chooseDate=selectedDates[0];
    ref.startTimerBtn.removeAttribute('disabled');
    ref.startTimerBtn.setAttribute('status','start')
    ref.startTimerBtn.classList.remove('disable-btn')
    ref.startTimerBtn.classList.add('green-btn')
    // updateTime(time);  
  },
}; 

const ref={
    timerInput:document.querySelector('#datetime-picker'),
    startTimerBtn: document.querySelector('[data-start]'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
}
let chooseDate=null;
let timerId=null;
ref.startTimerBtn.setAttribute('disabled', 'disabled');


const updateTime=({ days, hours, minutes, seconds })=> {
  ref.daysEl.textContent=`${days}`;
  ref.hoursEl.textContent=`${hours}`;
  ref.minutesEl.textContent=`${minutes}`;
  ref.secondsEl.textContent=`${seconds}`;
}

const startTimerHandler=(e)=>{
  
  const statusBtn=e.target.getAttribute('status');
  console.log(statusBtn);
  switch(statusBtn){
    case 'start':
      checkBtnStatus(e.target);
      timerId=setInterval(() => {
        const deltaTime= chooseDate-Date.now();
        if(deltaTime<=1000){
          console.log(`${deltaTime} меньше 1 секунды - Стоп!`)
          ref.startTimerBtn.setAttribute('status','reset')
          checkBtnStatus( ref.startTimerBtn);
          clearInterval(timerId);
         
          
        }
        const tempDate=convertMs(deltaTime);
        updateTime(tempDate);      
      }, 1000,chooseDate);
    break;
    case 'stop':
      checkBtnStatus(e.target);
      clearInterval(timerId);
    break;
    case 'reset':
      checkBtnStatus(e.target);
      const date={ days:0, hours:0, minutes:0,seconds:0, };
      updateTime(date);
      options.defaultDate=new Date();
      flatpickr (ref.timerInput, options) 
    break;      
  }   
}





  flatpickr (ref.timerInput, options) 
  ref.startTimerBtn.addEventListener('click',startTimerHandler)