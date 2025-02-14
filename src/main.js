import './style.css'
import JSConfetti from 'js-confetti'

//State management
let eyePosLeft = 0
let eyePosTop = 0
let mouthOpen = 88
let cCharacter = "elmo"


//UI Elements
const partyButton = document.getElementById("party")
const eyelrSlider = document.getElementById("eye-lr")
const eyeudSlider = document.getElementById("eye-ud")
const mouthSlider = document.getElementById("mouth-input")
const cookieBtn = document.getElementById('cookie')
const elmoBtn = document.getElementById('elmo')


//Event Listeners

//Elmo Button
elmoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  makeElmo()
})

//Cookie Monster Button
cookieBtn.addEventListener('click', (e) => {
  e.preventDefault()
  makeCookie()
})

//Eye Left - Right Slider
eyelrSlider.addEventListener("input", (e) => {
  const lf = e.target.value - 50
  updateEyeLeft(lf) 
})

//Eye Up - Down Slider
eyeudSlider.addEventListener("input", (e) => {
  const ud = e.target.value
  updateEyeTop(ud)
})

//Mouth Slider
mouthSlider.addEventListener("input", (e) => {
  const rotate = e.target.value
  updateMouth(rotate)
})

//Confetti Button
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

//Start with Elmo
makeElmo()
// makeAbby()


//Characters

function makeBasicCharacter(character){
  destroyCharacter()
  cCharacter = "elmo"
  const head = document.getElementById('head')
  head.classList = ''
  head.classList.add(character)
  head.classList.add('head-shadow')
  const eyes = document.createElement('div')
  eyes.id = "eyes"
  head.appendChild(eyes)
  for( let i=0; i<2; i++){
    const eyewrap = document.createElement('div')
    eyewrap.classList.add('eyewrap')
    const eye = document.createElement('div')
    eye.classList.add('eye')
    const eyeClass = character+"--eye"
    eye.classList.add(eyeClass)
    const eyeball = document.createElement('div')
    eyeball.classList.add('eyeball')
    eye.appendChild(eyeball)
    eyewrap.appendChild(eye)
    eyes.appendChild(eyewrap)
  }
  const nose = document.createElement('div')
  nose.id = 'nose'
  nose.classList = ''
  const noseClass = character+'--nose'
  nose.classList.add(noseClass)
  head.appendChild(nose)
  const mouth = document.createElement('div')
  mouth.id = 'mouth'
  mouth.classList = ''
  const mouthclass = character+'--mouth'
  mouth.classList.add(mouthclass)
  head.appendChild(mouth)
  const partyButton = document.getElementById('party')
  partyButton.classList = ''
  const partyClass = character+'-color'
  partyButton.classList.add(partyClass)
}

function makeElmo() {
  makeBasicCharacter('elmo')
}

function makeCookie() {
  makeBasicCharacter('cookie')
}


function makeAbby() {
  cCharacter = "abby"
  destroyCharacter()
  const charDims = setCharacterSize()
  const characterWidth = charDims.width + 'px'
  const head = document.getElementById('head')
  head.classList = ''
  head.classList.add('head-center-img')
  //Main Background 
  head.style.backgroundImage = 'url(images/Abby.svg)'
  head.style.backgroundSize = 'contain'
  head.style.backgroundRepeat = 'no-repeat'
  head.style.width = characterWidth
  head.style.height = characterWidth

  //Eyes
  const rightEyeBall = document.createElement('div')
  rightEyeBall.classList.add('eyeball')
  const leftEyeBall = document.createElement('div')
  leftEyeBall.classList.add('eyeball')
  const rightEye = document.createElement('div')
  rightEye.classList.add('eye')
  rightEye.id = 'eye'
  rightEye.classList.add('abby--eye')
  const leftEye = document.createElement('div')
  leftEye.classList.add('eye')
  leftEye.classList.add('abby--eye')
  const rightEyeWrap = document.createElement('div')
  rightEyeWrap.classList.add('eyewrap')
  const leftEyeWrap = document.createElement('div')
  leftEyeWrap.classList.add('eyewrap')
  const eyes = document.createElement('div')
  eyes.id = 'eyes'
  eyes.classList.add('abby--eye')
  eyes.style.top = charDims.height * .35 + 'px'
  rightEye.appendChild(rightEyeBall)
  leftEye.appendChild(leftEyeBall)
  rightEyeWrap.appendChild(rightEye)
  leftEyeWrap.appendChild(leftEye)
  eyes.appendChild(rightEye)
  eyes.appendChild(leftEye)
  head.appendChild(eyes)

}
//

function setCharacterSize() {
  const docWidth = document.body.clientWidth
  let width = 600
  console.log('docWidth: ', docWidth)
  if(docWidth < 600) {
    width = docWidth * 0.9
  }
  const height = width
  return {width, height}
}



//General utility items

function destroyCharacter() {
  const head = document.getElementById('head')
  head.style = ''
  head.innerHTML = ''
}

//Utility functions that actually update the character features

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
    mouth.style.transform = `rotateX(${mouthOpen}deg)`
  }
}

//If the person doesn't want to use the sliders they can click
//on the canvas to update either the eyes or the mouth
const clickDiv = document.getElementById("click")
if(clickDiv) {
  clickDiv.addEventListener("click", (e) => {
    console.log('e: ', e.target)
    console.log('e.target.style.z-index: ', e.target.style.zIndex)
    const checkBox = document.getElementById('switch')
    const [dist, ang] = clickConverter(e)
    if(checkBox) {
      if(checkBox.checked==false){
        const eyeball = document.getElementsByClassName('eyeball')
        const eye = document.getElementsByClassName('eye')[0]
        const eyeHeight = eye.clientHeight / 2
        const eyeWidth = eye.clientWidth / 2
        const vOffsetDistance = eyeHeight * dist
        const hOffsetDistance = eyeWidth * dist
        const tp = -Math.sin(ang) * vOffsetDistance + 50
        const lf = Math.cos(ang) * hOffsetDistance
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
  const debug = true

  const clickDiv = document.getElementById('click')
  //Click coordinates
  const x = event.clientX
  let y = event.clientY
  //Size of element clicked
  const w = clickDiv.offsetWidth
  const h = clickDiv.offsetHeight
  const cDivBox = clickDiv.getBoundingClientRect()
  const cDivTop = cDivBox.top
  const cDivBot = cDivBox.left
  y = y - cDivTop
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
