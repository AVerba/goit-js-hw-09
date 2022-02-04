export const checkBtnStatus=(btnRef)=>{
    console.log(btnRef)
    const btnAtribut=btnRef.getAttribute('status');
    switch(btnAtribut){
      case 'disabled':
        console.log(`function is fine`)
        btnRef.classList.remove('green-btn')
        btnRef.classList.add('red-btn')
        btnRef.textContent="Stop"
        btnRef.removeAttribute('disabled')
        btnRef.setAttribute('status','stop')
      break;
      case 'start':
        console.log(`function is fine`)
        btnRef.classList.remove('green-btn')
        btnRef.classList.add('red-btn')
        btnRef.textContent="Stop"
        btnRef.removeAttribute('start')
        btnRef.setAttribute('status','stop')
      break;
      case 'stop':
        console.log(`function is fine`)
        btnRef.classList.remove('red-btn')
        btnRef.classList.add('yellow-btn')
        btnRef.textContent="Reset"
        btnRef.removeAttribute('stop')
        btnRef.setAttribute('status','reset')
      break;
      case 'reset':
        console.log(`function is fine`)
        btnRef.classList.remove('yellow-btn')
        btnRef.classList.remove('red-btn')
        btnRef.classList.add('disable-btn')
        btnRef.textContent="Start"
        btnRef.removeAttribute('reset')
        btnRef.setAttribute('status','disabled')
        btnRef.setAttribute('disabled','disabled')
      break;
    }
  }