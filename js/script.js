
//** ЧАСЫ Старт*/
const time = document.querySelector(".time")
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = `${currentTime}`;
    setTimeout(showTime, 1000)
}
showTime()
//** ЧАСЫ КОНЕЦ*/

//**Дата начало*/
const day = document.querySelector(".day")
function showDay(lang = 'en-En') {
    const date = new Date();
    const options = { month: 'long', weekday: 'long', day: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString(lang, options);
    day.textContent = `${currentDate}`;
    // setTimeout(showDay, 1000)
}

//**Дата конец*/

//**Приветствие начало*/
const none = document.querySelector(".none");
const greetings = document.querySelector(".greetings")
function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    const greetingTranslation = {
        ru: ["Доброе утро  ", "Добрый день  ", "Добрый вечер  ", "Доброй ночи  "],
        en: ["Good morning  ", "Good afternoon  ", "Good evening  ", "Good night  "]
    }
    let greeting;
    let textFon;
    (hours >= 0 && hours < 6) ? greeting = "night" :
        (hours >= 6 && hours < 12) ? greeting = "morning" :
            (hours >= 12 && hours < 18) ? greeting = "afternoon" : greeting = "evening";
    greetings.textContent = `Good ${greeting}`;
    textFon = greeting;
    if (none.value == "ru") {
        (hours >= 0 && hours < 6) ? greeting = greetingTranslation.ru[3] :
            (hours >= 6 && hours < 12) ? greeting = greetingTranslation.ru[0] :
                (hours >= 12 && hours < 18) ? greeting = greetingTranslation.ru[1] : greeting = greetingTranslation.ru[2];
        greetings.textContent = `${greeting}`;
    }
    setTimeout(showGreeting, 1000)
    return textFon;
}

//**Приветствие конец*/

//**NAME начало*/
const setname = document.querySelector(".name")

function setLocalStorage() {
    localStorage.setItem('name', setname.value);
}
window.addEventListener('beforeunload', setLocalStorage)
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        setname.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage)
//**NAME конец*/

//**Фон начало*/
const body = document.querySelector("body");

function getRandomArbitrary(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    if (num < 9) num = '0' + num;
    return num
}
const number = getRandomArbitrary(1, 20);
let num = number;

let image = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showGreeting()}/${num}.jpg`;
body.style.backgroundImage = `url('${image}')`;

const prev = document.querySelector(".slide-prev");
const next = document.querySelector(".slide-next");
const slide = document.querySelectorAll(".slide");
const conteiner = document.querySelector(".container");

prev.addEventListener("click", async () => {
    num--;
    if (num < 10) num = '0' + num;
    if (num < 1) num = 20;
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showGreeting()}/${num}.jpg`;
    img.onload = () => {
        body.style.backgroundImage = `url('${img.src}')`;
    };
});
next.addEventListener("click", async () => {

    num++
    if (num < 10) num = '0' + num;
    if (num > 20) num = '01';
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${showGreeting()}/${num}.jpg`;

    img.onload = () => {
        body.style.backgroundImage = `url('${img.src}')`;
    };
})
//**Фон конец*/

//**Погода начало */
//**СОХРАНЯЕМ ГОРОД КОТОРЫЙ ВВЕЛ ПОЛЬЗОВАТЕЛЬ */
function setLocalStorageCity() {
    localStorage.setItem('city', city.value);

}
window.addEventListener('beforeunload', setLocalStorageCity)
function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorageCity)

//**ОБЪЕКТЫ ПОГОДЫ */
const city = document.querySelector(".weather_city");
const temperature = document.querySelector(".temperature");
let weatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const windSpeed = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

//**БЕРЕМ С ПОМОЩЬЮ API ИНФОРМАЦИЮ О ПОГОДЕ */
async function getWeather(city, language) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=1d95766d64db573786b12ee8823fadb2&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.floor(data.main.temp)} °C`;
        weatherDescription.textContent = data.weather[0].description;
        if (language == "en") {
            windSpeed.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
        } else { windSpeed.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`; }
        if (language == "en") {
            humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
        } else { humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)}%`; }

    }
    catch (err) {
        if (language == "ru") {
            weatherError.textContent = `Ошибка! Пожалуйста введите корректное название города.`;
        } else {
            weatherError.textContent = `Error! Please enter the correct city name.`;
        }
        weatherError.style.display = "block";
        temperature.textContent = "";
        weatherDescription.textContent = "";
        windSpeed.textContent = "";
        humidity.textContent = "";
        return
    }
}

//**ВЫЗЫВАЕМ ФУНКЦУЮ ПРИ ИЗМЕНЕНИИ ГОРОДА */
city.addEventListener("change", () => {
    weatherError.textContent = "";
    weatherError.style.display = "none";
    getWeather(city.value, lang.textContent)
})


//**Погода конец */

//**ЦИТАТЫ ДНЯ НАЧАЛО */

//**СОЗДАНИЕ РАНДОМНОЙ ЦИТАТЫ */
function getRandomQuote(min, max) {
    let num = Math.floor(Math.random() * (max - min) + min);
    return num
}
let numberQuote = getRandomQuote(1, 9)

const quoteButton = document.querySelector(".button")
const text = document.querySelector(".text")
const author = document.querySelector(".author")
async function getQuotes(num) {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    text.textContent = `"${data[num].text}"`
    author.textContent = `${data[num].author}`
}
getQuotes(numberQuote);

quoteButton.addEventListener("click", () => {
    numberQuote = getRandomQuote(1, 9);
    getQuotes(numberQuote)
})

//**ЦИТАТЫ ДНЯ КОНЕЦ */


//**АУДИОПЛЕЕР НАЧАЛО*/

//**ПОДКЛЮЧАЕМ ФАЙЛ С МУЗЫКОЙ*/
import playList from './playList.js';

//**БЕРЕМ НУЖНЫЕ НАМ ТЕГИ*/
const audio = new Audio();
const play = document.querySelector(".play_music");
const prev_music = document.querySelector(".prev_play");
const next_music = document.querySelector(".next_play");
let time_current = document.querySelector(".current");
const length = document.querySelector(".length");
const nameMusic = document.querySelector(".name_music");
const authorMusic = document.querySelector(".author_music");
const progressBar = document.querySelector("#progress-bar");
let num_music = 0;
let isPlay = false;
let currentTime = 0;

//**ВЫЗЫВАЕМ МУЗЫКУ*/
function playAudio(num, currentTime) {
    if (!isPlay) isPlay = true;
    audio.src = `${playList[num].src}`;
    audio.currentTime = currentTime;
    addDataMusic(num)
    audio.play();
    if (isPlay) play.classList.add('pouse_music');
    let elemById = document.querySelectorAll(".play-list_li");
    setElemMusic(elemById[num])
}


function pauseAudio() {
    if (isPlay) isPlay = false;
    audio.pause();
    currentTime = audio.currentTime;

}

//**СМЕНА ЗНАЧКА  ПЛЕЙ НА ПАУЗУ*/
function toggleBtn() {
    if (!isPlay) return
    play.classList.toggle('pouse_music');
}
play.addEventListener('click', toggleBtn);



//**ЗАПУСКАЕМ МУЗЫКУ*/
play.addEventListener("click", () => {
    (!isPlay) ? playAudio(num_music, currentTime) : pauseAudio(num_music);
})


//**ПРЕДЫДУЩАЯ МУЗЫКА*/
prev_music.addEventListener("click", () => {
    num_music--
    if (num_music < 0) num_music = playList.length - 1;
    addDataMusic(num_music)
    playAudio(num_music, 0);
})

//**СЛЕДУЮЩАЯ МУЗЫКА*/
next_music.addEventListener("click", () => nextMusic())
function nextMusic() {
    num_music++
    if (num_music > playList.length - 1) num_music = 0;
    addDataMusic(num_music)
    playAudio(num_music, 0);
}

//**ДОБАВЛЯЕМ ДАННЫЕ В МУЗЫКУ*/
function addDataMusic(num_music) {
    length.textContent = `${playList[num_music].duration}`;
    nameMusic.textContent = `${playList[num_music].title}`;
    authorMusic.textContent = `${playList[num_music].executor}`;
}

//**ВРЕМЯ  МУЗЫКИ*/
function updateProgressValue() {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    document.querySelector(".current").textContent = (formatTime(Math.floor(audio.currentTime)));


    if (audio.duration == audio.currentTime) {
        nextMusic();
    }

};

//**ФОРМАТ  MM:SS МУЗЫКИ*/ 
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

//**ИЗМЕНЕНИЕ КАРЕТКИ */ 
function changeProgressBar() {
    audio.currentTime = progressBar.value;
};
progressBar.addEventListener("click", () => {
    changeProgressBar()
})

// //**ЗВУК ИКОНКА*/
let valueSave = 0.75;
function setValueIcon() {
    valueIcon.classList.toggle("value_icon_mute");
    if (!valueIcon.classList.toggle("value_icon_mute")) {
        valueIcon.classList.add("value_icon_mute")
        audio.volume = 0;
        valueBar.value = 0;
    }
    else {
        valueIcon.classList.remove("value_icon_mute")
        audio.volume = valueBar.value = valueSave;
    }
}
const valueIcon = document.querySelector(".value_icon");
valueIcon.addEventListener("click", () => {
    setValueIcon()
})

//**ИЗМЕНЕНИЕ ИКОНКИ ПРИ 0 ЗВУКЕ*/
const valueBar = document.querySelector("#value-bar");
valueBar.addEventListener("mousemove", () => {
    audio.volume = valueBar.value;
    if (audio.volume === 0) valueIcon.classList.add("value_icon_mute");;
    if (audio.volume > 0) valueIcon.classList.remove("value_icon_mute");
    valueSave = valueBar.value;
})

//**СОЗДАЕМ АВТОМАТИЧЕСКИЙ ПЛЕЙ ЛИСТ */
const playListUl = document.querySelector(".play-list");
playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add("play-list_li");
    li.id = `${el.number}`
    li.textContent = `${el.title}, ${el.executor}`;
    playListUl.append(li);
})

//**ФУНКЦИИ ДЛЯ ОКРАШИВАЕМ И ЗАПУСКАЕМ МУЗЫКУ ЧЕРЕЗ ЛИСТ */
let elem = playListUl;

function setElemMusic(play_elem) {
    elem.style.color = "aliceblue"
    play_elem.style.color = "rgba(236, 171, 67, 0.698)"
    elem = play_elem;
}
function playMusicList(play_elem) {
    playAudio(play_elem.id, 0)
}
//**ОКРАШИВАЕМ И ЗАПУСКАЕМ МУЗЫКУ ЧЕРЕЗ ЛИСТ */
playListUl.addEventListener("click", (el) => {
    setElemMusic(el.path[0])
    playMusicList(el.path[0])
});



//**ОКРАШИВАЕМ НАШ СПИСОК КОГДА ПЕРЕКЛЮЧАЕМ МУЗЫКУ ЧЕРЕЗ КНОПКИ */
play.addEventListener("click", () => {
    let elemById = document.querySelectorAll(".play-list_li");
    setElemMusic(elemById[num_music])
})
//**АУДИОПЛЕЕР КОНЕЦ*/

//**ПЕРЕВОД ТЕКСТА*/
const lang = document.querySelector(".lang");




function en() {
    none.value = "en"
    lang.textContent = "en";
    none.textContent = 'en-En';
    getWeather(city.value, "en")
    showDay('en-En');

}

function ru() {
    none.value = "ru"
    lang.textContent = "ru"
    none.textContent = 'ru-Ru';
    getWeather(city.value, "ru")
    showDay('ru-Ru')

}

lang.addEventListener("click", () => {
    if (none.value == "ru") { en() }
    else { ru() }
})


function setLocalStorageLang() {
    localStorage.setItem('value', none.value);
}
window.addEventListener('beforeunload', setLocalStorageLang)
function getLocalStorageLang() {
    none.value = localStorage.getItem('value');
    if (none.value == "ru") { ru() }
    else { en() }
}
window.addEventListener('load', getLocalStorageLang)





// alert("Здраствуйте, у меня к вам проcьба, проверьте пожалуйста мою работу после 26го числа. Я очень хочу ее доработать. Заранее спасибо, очень вам признателен буду")