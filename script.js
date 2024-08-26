const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const secondElement = document.getElementsByClassName("sec")[0];
const minuteElement = document.getElementsByClassName("minute")[0];
const milliSecondElement = document.getElementsByClassName("msec")[0];
const lapsList = document.getElementsByClassName("laps")[0];
const clearLapsButton = document.getElementsByClassName("lap-clear-button")[0];

let isPlay = false;
let secCounter = 0;
let minCounter = 0;
let milliSecCounter = 0;
let secInterval;
let milliSecInterval;

const toggleButtonVisibility = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = "Pause";
        secInterval = setInterval(() => {
            secCounter++;
            if (secCounter >= 60) {
                secCounter = 0;
                minCounter++;
                minuteElement.innerHTML = `${minCounter} :`;
            }
            secondElement.innerHTML = `${secCounter < 10 ? '0' + secCounter : secCounter} : `;
        }, 1000);

        milliSecInterval = setInterval(() => {
            milliSecCounter++;
            if (milliSecCounter >= 100) {
                milliSecCounter = 0;
            }
            milliSecondElement.innerHTML = `${milliSecCounter < 10 ? '0' + milliSecCounter : milliSecCounter}`;
        }, 10);

        isPlay = true;
    } else {
        playButton.innerHTML = "Play";
        clearInterval(secInterval);
        clearInterval(milliSecInterval);
        isPlay = false;
    }
    toggleButtonVisibility();
}

const reset = () => {
    clearInterval(secInterval);
    clearInterval(milliSecInterval);
    secCounter = 0;
    minCounter = 0;
    milliSecCounter = 0;
    secondElement.innerHTML = '00 :';
    minuteElement.innerHTML = '00 :';
    milliSecondElement.innerHTML = '00';
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    playButton.innerHTML = "Play";
    isPlay = false;
    lapsList.innerHTML = ''; // Clear laps
}

const addLap = () => {
    const lapTime = `${minCounter < 10 ? '0' + minCounter : minCounter} : ${secCounter < 10 ? '0' + secCounter : secCounter} : ${milliSecCounter < 10 ? '0' + milliSecCounter : milliSecCounter}`;
    const lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="number">#${lapsList.childElementCount + 1}</span>
        <span class="time-stamp">${lapTime}</span>
    `;
    lapsList.appendChild(lapItem);
}

const clearLaps = () => {
    lapsList.innerHTML = '';
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", addLap);
clearLapsButton.addEventListener("click", clearLaps);
