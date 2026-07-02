"use strict";

// Получаем все нужные данные
const div = document.querySelector('.timer_container-imgs');
const wrapper = document.querySelector('.wrapper');
const finalText = document.querySelector('.timer_container-finish');
const timerContainer = document.querySelector('.timer_container-content');

const daysClock = document.getElementById('days_clock');
const daysText = document.getElementById('days_text');
const hoursClock = document.getElementById('hours_clock');
const hoursText = document.getElementById('hours_text');
const minutesClock = document.getElementById('minutes_clock');
const minutesText = document.getElementById('minutes_text');
const secondsClock = document.getElementById('seconds_clock');
const secondsText = document.getElementById('seconds_text');

// Получаем нужное время
const futureTime = new Date("07 09 2026 00:00");

const updateTime = (time) => time <= 9 && !isNaN(`0${time}`) ? `0${time}` : time;

const updateText = (time, text) => {
    if (typeof time !== 'number' || isNaN(time)) {
        return text;
    }

    const rules = new Intl.PluralRules('ru', {type: 'cardinal'});
    const pluralForm = rules.select(Math.abs(time)); // 'one', 'few', 'many'

    let word;

    switch (text) {
        case 'Дней':
            if (pluralForm === 'one') word = 'День';
            else if (pluralForm === 'few') word = 'Дня';
            else word = 'Дней';
            break;

        case 'Часов':
            if (pluralForm === 'one') word = 'Час';
            else if (pluralForm === 'few') word = 'Часа';
            else word = 'Часов';
            break;

        case 'Минут':
            if (pluralForm === 'one') word = 'Минута';
            else if (pluralForm === 'few') word = 'Минуты';
            else word = 'Минут';
            break;

        case 'Секунд':
            if (pluralForm === 'one') word = 'Секунда';
            else if (pluralForm === 'few') word = 'Секунды';
            else word = 'Секунд';
            break;

        default:
            word = text;
    }

    return word;
}

const setAppTime = () => {
    const presentTime = new Date();

    const getTime = futureTime - presentTime;
    const getDay = Math.floor(getTime / 1000 / 60 / 60 / 24);
    const getHour = Math.floor(getTime / 1000 / 60 / 60) % 24;
    const getMinute = Math.floor(getTime / 1000 / 60) % 60;
    const getSecond = Math.floor(getTime / 1000) % 60;

    if (
        getDay <= 0 &&
        getHour <= 0 &&
        getMinute <= 0 &&
        getSecond <= -1
    ) {
        div.classList.add('active')
        wrapper.style.overflowY = "auto";
        finalText.classList.add('active')
        timerContainer.classList.add('disabled')
        console.log('Поздравляю вас!')
        return cancelAnimationFrame(id)
    }

    updateText(getSecond, secondsText.textContent);
    daysText.textContent = updateText(getDay, 'Дней')
    daysClock.textContent = updateTime(getDay);
    hoursText.textContent = updateText(getHour, 'Часов')
    hoursClock.textContent = updateTime(getHour);
    minutesText.textContent = updateText(getMinute, 'Минут')
    minutesClock.textContent = updateTime(getMinute);
    secondsText.textContent = updateText(getSecond, 'Секунд')
    secondsClock.textContent = updateTime(getSecond);
    requestAnimationFrame(setAppTime)
}

let id = requestAnimationFrame(setAppTime)
