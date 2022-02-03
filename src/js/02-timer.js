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

const convertMs=(ms)=>{

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const updateTime=({ days, hours, minutes, seconds })=> {
  ref.daysEl.textContent=`${days}`;
  ref.hoursEl.textContent=`${hours}`;
  ref.minutesEl.textContent=`${minutes}`;
  ref.secondsEl.textContent=`${seconds}`;
}
const startTimerHandler=()=>{
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
}

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
      //updateTime(time);  
    },
  }; 



  flatpickr (ref.timerInput, options) 
  ref.startTimerBtn.addEventListener('click',startTimerHandler)