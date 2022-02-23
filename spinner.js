let slots = document.getElementById('slots')
let slot_top = document.querySelector('.slotitem.top')
let slot_bottom = document.querySelector('.slotitem.bottom')

let nextText = 'YES'

let text1 = 'YES'
let text2 = 'NO'
slot_top.textContent = text1
slot_bottom.textContent = text2

function moveToNextText() {
    text1 = text2
    text2 = nextText
    slot_top.textContent = text1
    slot_bottom.textContent = text2
}

let max_y = 190

let y = 20;
let yv = 0;
slots.style.top = -y + 'px'

function spin() {
    slot_height = slots.clientHeight

    y += yv
    yv *= 0.998

    while (y > max_y) {
        y -= max_y
        nextText = nextText == 'YES' ? 'NO' : 'YES'
        // nextText = (Math.random() < 0.5) ? 'no' : 'yes'
        moveToNextText()
    }

    slots.style.top = -y + 'px'

    if (yv > 0.2) {
        requestAnimationFrame(spin)
    } else {
        glideToNextSlot(() => {
            nextText = 'maybe??'
            moveToNextText()
            glideToNextSlot(() => {
                y = max_y
                slots.style.top = -y + 'px'
                spinning = false
            })
        })
        
    }
}

function glideToNextSlot(callback) {
    if (y > max_y) {
        y = 0
        slots.style.top = -y + 'px'
    }
    y += 5
    slots.style.top = -y + 'px'
    if (y > max_y) {
        callback()
    } else {
        requestAnimationFrame(() => {glideToNextSlot(callback)})
    }
}

let spinning = false
let maxRampUpAcceleration = 0
spinbutton = document.getElementById('spinbutton')
spinbutton.addEventListener('click', () => {
    if (spinning) return;
    spinning = true
    yv = 0.3
    spin()
    maxRampUpAcceleration = (Math.random()*8) + 20
    randomRampUpSpinAcceleration()
})

function randomRampUpSpinAcceleration() {
    yv *= 1.02
    if (yv < maxRampUpAcceleration) {
        requestAnimationFrame(randomRampUpSpinAcceleration)
    }
}