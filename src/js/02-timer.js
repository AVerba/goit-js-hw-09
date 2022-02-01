import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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

const updateTime=({ days, hours, minutes, seconds })=> {
  ref.daysEl.textContent=`${days}`;
  ref.hoursEl.textContent=`${hours}`;
  ref.minutesEl.textContent=`${minutes}`;
  ref.secondsEl.textContent=`${seconds}`;
}

ref.startTimerBtn.addEventListener('click',()=>{
    // Notiflix.Notify.failure('Qui timide rogat docet negare');    
    
    timerId=setInterval(() => {
      const deltaTime= chooseDate-Date.now();
      if(deltaTime<=1000){
        console.log(`${deltaTime} меньше 1 секунды - Стоп!`)
        clearInterval(timerId);
      }
      const tempDate=convertMs(deltaTime);


      updateTime(tempDate);
      console.log(chooseDate-Date.now())
      
    }, 1000,chooseDate);
})



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0]<=options.defaultDate){
        Notiflix.Notify.failure('Qui timide rogat docet negare')
        return;
      }
      const time=convertMs(selectedDates[0]-options.defaultDate);
      chooseDate=selectedDates[0];
    
      // const {days, hours, minutes, seconds}=time;
      updateTime(time);

      

    },
  };

  flatpickr (ref.timerInput, options) 

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
