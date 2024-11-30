import './style.css'
import JSConfetti from 'js-confetti'

//

document.querySelector('#app').innerHTML = `
<main>
  <div id="click">
  <div id="head" class="elmo">
    <div id="eyes">
      <div class="eyewrap">
        <div class="eye">
          <div class="eyeball">
          </div>
        </div>
      </div>
      <div class="eyewrap">
        <div class="eye">
          <div class="eyeball">
          </div>
        </div>
      </div>
    </div>
    <div id="nose">
    </div>
    <div id="mouth">
    </div>
  </div>
  </div>
  <div class="contain">
    Eyes
    <label class="switch" for="switch">
      <input id="switch" type="checkbox">
      <span class="slider round"></span>
    </label>
    Mouth
    <div class="control">
      <label for="eye-lr">Eye - Left / Right<label>
      <input id="eye-lr" type="range"></input>
    </div>
    <div class="control">
      <label for="eye-ud">Eye - Up / Down<label>
      <input id="eye-ud" type="range"></input>
    </div>
    <div class="control">
      <label for="mouth-input">Mouth<label>
      <input id="mouth-input" min=-88 max=0 type="range"></input>
    </div>
    <div class="control">
      <button id="party">Party</button>
    </div>
    <div class="control">
      <button id="elmo" class="character-btn">Elmo</button>
      <button id="cookie" class="character-btn">Cookie</button>
    </div>
  </div>
`

let eyePosLeft = 0
let eyePosTop = 0
let mouthOpen = 88



const partyButton = document.getElementById("party")
const eyelrSlider = document.getElementById("eye-lr")
const eyeudSlider = document.getElementById("eye-ud")
const mouthSlider = document.getElementById("mouth-input")
const cookieBtn = document.getElementById('cookie')
const elmoBtn = document.getElementById('elmo')

makeElmo()


function makeCookie() {
  const head = document.getElementById('head')
  head.classList = ''
  head.classList.add('cookie')
  const nose = document.getElementById('nose')
  nose.classList = ''
  nose.classList.add('cookie--nose')
  const mouth = document.getElementById('mouth')
  mouth.classList = ''
  mouth.classList.add('cookie--mouth')
  const eyes = document.getElementsByClassName('eye')
  for(let eye of eyes) {
    eye.classList = ''
    eye.classList.add('eye')
    eye.classList.add('cookie--eye')
  }
}

function makeElmo() {
  const head = document.getElementById('head')
  head.classList = ''
  head.classList.add('elmo')
  const nose = document.getElementById('nose')
  nose.classList = ''
  nose.classList.add('elmo--nose')
  const mouth = document.getElementById('mouth')
  mouth.classList = ''
  mouth.classList.add('elmo--mouth')
  const eyes = document.getElementsByClassName('eye')
  for(let eye of eyes) {
    eye.classList = ''
    eye.classList.add('eye')
    eye.classList.add('elmo--eye')
  }
}

function updateEyeLeft(left) {
  eyePosLeft = left
  eyelrSlider.value = left+50
  const eyes = document.getElementsByClassName('eyeball')
  if(eyes) {
    for(let eye of eyes) {
      eye.style.left = eyePosLeft.toString() + "px"
    }
  }
}

function updateEyeTop(top) {
  eyePosTop = top
  eyeudSlider.value = top
  const eyes = document.getElementsByClassName('eyeball')
  if(eyes) {
    for(let eye of eyes) {
      eye.style.top = eyePosTop.toString() + "px"
    }
  }
}

function updateMouth(opening) {
  mouthOpen = opening
  mouthSlider.value = opening
  const mouth = document.getElementById('mouth')
  if(mouth) {
    mouth.style.transform = `rotateX(${opening}deg)`
  }
}

cookieBtn.addEventListener('click', (e) => {
  e.preventDefault()
  makeCookie()
})

elmoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  makeElmo()
})


eyelrSlider.addEventListener("input", (e) => {
  const lf = e.target.value - 50
  updateEyeLeft(lf) 
})

eyeudSlider.addEventListener("input", (e) => {
  const ud = e.target.value
  updateEyeTop(ud)
})

mouthSlider.addEventListener("input", (e) => {
  const rotate = e.target.value
  updateMouth(rotate)
})

partyButton.addEventListener("click", () => {
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti()

  const nose = document.getElementById('nose')
  if(nose.classList.contains('elmo--nose')) {
    nose.style.height = "200px"
    nose.style.width = "200px"  
  }

  const eyes = document.getElementsByClassName('eye')
  for( let eye of eyes) {
    eye.style.height = "170px"
    eye.style.width = "160px"

  }
  setTimeout(() => {
    nose.style.width = "130px"
    nose.style.height= "150px"
    for( let eye of eyes) {
      eye.style.height = "140px"
      eye.style.width = "130px"
    }
  }, 500);
  const eyeX = Math.floor(Math.random() * 100) - 50
  const eyeY = Math.floor(Math.random() * 100)
  const moPos = Math.floor(Math.random() * 88) * -1
  updateEyeLeft(eyeX)
  updateEyeTop(eyeY)
  updateMouth(moPos)
  
})

const clickDiv = document.getElementById("click")
if(clickDiv) {
  clickDiv.addEventListener("click", (e) => {
    const checkBox = document.getElementById('switch')
    const [dist, ang] = clickConverter(e)
    if(checkBox) {
      if(checkBox.checked==false){
        const eyeball = document.getElementsByClassName('eyeball')
        const offsetDistance = 50 * dist
        const tp = -Math.sin(ang) * offsetDistance + 50
        const lf = Math.cos(ang) * offsetDistance
        updateEyeLeft(lf)
        updateEyeTop(tp)
      } else {
        const offset = ang > 0 ? dist * 45 : -dist * 45
        const openAngle = 45 + offset
        updateMouth(-openAngle)
      }
    }
  })
}


//This converter assumes we are looking for a normalized 
//distance and angle from the center of the element clicked
function clickConverter(event) {
  const debug = false

  //What element was clicked?
  const parentElement = event.target

  //Click coordinates
  const x = event.clientX
  const y = event.clientY
  //Size of element clicked
  const w = parentElement.offsetWidth
  const h = parentElement.offsetHeight
  //Coordinates at the center of the element clicked
  const cX = w / 2
  const cY = h / 2
  //Distance relative to center coordinates of the click.
  const distX = x - cX
  const distY = cY - y
  //Maximum possible distance away 
  const maxDist = Math.sqrt(cX * cX + cY * cY)
  //Distance away of click
  const clickDist = Math.sqrt(distX * distX + distY * distY)
  const normalizedDistance = clickDist / maxDist
  const angle = coordsToPosition(distX, distY)

  if(debug===true) {
    console.log('x: ', x)
    console.log('y: ', y)
    console.log('w: ', w)
    console.log('h: ', h)
    console.log('cX: ', cX)
    console.log('cY: ', cY)
    console.log('distX: ', distX)
    console.log('distY: ', distY)
    console.log('maxDist: ', maxDist)
    console.log('clickDist: ', clickDist)
    console.log('normalizedDistance: ', normalizedDistance)
    console.log('angle: ', angle)
  }

  return [normalizedDistance, angle]
}

function coordsToPosition(x, y) {
  const rad = Math.atan2(y, x)
  return rad
}
