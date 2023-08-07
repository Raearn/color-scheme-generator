const arrow = document.querySelector('.custom-arrow')
const dropdown = document.querySelector('.select-mode')
const modes = document.querySelectorAll('.mode')
const options = document.querySelector('.options')
const defaultColorValue = document.querySelector('#select-color').value.substring(1)
const defaultModeElement = document.querySelector('.mode[data-value="analogic"]')
const getSchemeBtn = document.querySelector('#get-btn')
const body = document.querySelector('body')

//Initialize default values
dropdown.textContent = defaultModeElement.textContent
defaultModeElement.classList.add("clicked")

document.addEventListener('DOMContentLoaded', function() {
  const clickedMode = document.querySelector('.mode.clicked');
  const selectedMode = clickedMode.dataset.value

  renderColor(defaultColorValue, selectedMode)
});

document.addEventListener("click", function(e) {
  const mode = e.target.dataset.value
  if (mode) {

    const modeParent = e.target

    modes.forEach(function(modeEl) {
      modeEl.classList.remove('clicked')
    })

    modeParent.classList.toggle('clicked')
    const modeText = e.target.textContent
    dropdown.textContent = modeText

    dropDown()
  }
})

getSchemeBtn.addEventListener("click", function() {
  const clickedMode = document.querySelector('.mode.clicked');
  const selectedMode = clickedMode.dataset.value
  const selectedColorValue = document.querySelector('#select-color').value.substring(1)

  renderColor(selectedColorValue, selectedMode)

})

function dropDown() {
  arrow.classList.toggle('rotate');
  options.classList.toggle('show')
}

const colors = [
  document.querySelector(".one"),
  document.querySelector(".two"),
  document.querySelector(".three"),
  document.querySelector(".four"),
  document.querySelector(".five")
]

const hexValue = [
  document.querySelector(".hex-one"),
  document.querySelector(".hex-two"),
  document.querySelector(".hex-three"),
  document.querySelector(".hex-four"),
  document.querySelector(".hex-five")
]

function renderColor(colorValue, selectedMode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${selectedMode}`)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < colors.length; i++) {
        colors[i].style.backgroundColor = data.colors[i].hex.value;
        hexValue[i].textContent = data.colors[i].hex.value
      }
      body.style.background = `linear-gradient(90deg, ${hexValue[0].textContent}, ${hexValue[1].textContent}, 
        ${hexValue[2].textContent}, ${hexValue[3].textContent}, ${hexValue[4].textContent})`
    });
}

dropdown.addEventListener('mousedown', dropDown);
