"use strict";

// Получаем нужное время
const futureTime = new Date("06 18 2026 19:04");

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
        console.log('Поздравляю вас!')
        return cancelAnimationFrame(id)
    }

    console.log((`До свадьбы осталось: Дней ${getDay}, ${getHour} ${getMinute} ${getSecond}`));
    requestAnimationFrame(setAppTime)
}

let id = requestAnimationFrame(setAppTime)