"use strict";

import "./background/background.js";
import "./timer/timer.js";

const div = document.querySelector('.timer_container-imgs')

setTimeout(() => div.classList.add('active'), 1000)