let isTimerStarted = false;

let time = document.getElementById('time');
let totalTime = time.innerText.split(':');
let seconds = parseInt(totalTime[0]) * 60 + parseInt(totalTime[1]);
let totalSeconds = seconds;

let gear = document.getElementById('gear')
let check = document.getElementById('check')

let input = document.getElementById('inputs')
let inpOne = document.getElementById('inputOne')
let inpTwo = document.getElementById('inputTwo')

let circle = document.getElementById('progressBar');
let length = circle.getTotalLength();

let btn = document.getElementById('trigger');

let timer = document.getElementById('timer');

function startStopTimer() {
    if (gear.style.display !== 'none') {
        let restTime = time.innerText.split(':');
        let restSeconds = totalSeconds - (parseInt(restTime[0]) * 60 + parseInt(restTime[1]));

        let customTime = new Date(0)

        timerCounter(customTime)

        if (btn.innerText === 'START') {
            btn.innerText = 'STOP';

            circle.style.stroke = '#000000';
            timer.style.background = '#00aa51';
            circle.style.strokeDasharray = length;
            circle.style.animation = `anim ${seconds}s linear forwards`;

            if (!isTimerStarted) {
                isTimerStarted = true

                circle.style.strokeDashoffset = length;

                timerFinish(customTime)
            } else {
                circle.style.strokeDashoffset = length - (length / totalSeconds * restSeconds);
            }

        } else {
            stop(restSeconds)
        }
    }
}

function timerCounter(customTime) {
    setInterval(() => {
        seconds = seconds - 1
        customTime.setMinutes(Math.floor(seconds / 60))
        customTime.setSeconds(seconds % 60)
        time.innerText = customTime.toLocaleTimeString().substr(3);
    }, 1000)
}

function timerFinish(customTime) {
    if (circle.getAttribute('listener') !== 'true') {
        circle.addEventListener('animationend', () => {
            circle.setAttribute('listener', 'true')

            for (let i = 0; i < 999; i++)
                clearInterval(i)

            customTime.setSeconds(0)
            time.innerText = customTime.toLocaleTimeString().substr(3);
            btn.innerText = 'START';
            timer.style.background = '#9d0000';
            circle.style.stroke = 'none';
            circle.style.animation = null;
            isTimerStarted = false;
            alert('stop');
        });
    }
}

function stop(restSeconds) {
    for (let i = 0; i < 999; i++)
        clearInterval(i)

    btn.innerText = 'START';
    circle.style.strokeDashoffset = length - (length/totalSeconds * restSeconds);
    circle.style.animation = null;
}

function changeTime() {
    if (gear.style.display === 'none') {
        gear.style.display = 'block'
        check.style.display = 'none'
        input.style.display = 'none'
        time.style.display = 'block'
        time.innerText = `${inpOne.value}:${inpTwo.value}`
        seconds = +inpOne.value * 60 + +inpTwo.value;
        totalSeconds = seconds;
    } else {
        gear.style.display = 'none'
        check.style.display = 'block'
        input.style.display = 'block'
        time.style.display = 'none'
        let totalTime = time.innerText.trim().split(':');
        inpOne.value = totalTime[0]
        inpTwo.value = totalTime[1]
    }
}
