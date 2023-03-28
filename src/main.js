import { movies } from "./library.js";
import { moviesEs } from "./film-es.js";
import { today } from "./date.js";

//Declare variables
var day = today;
console.log(today);
var movieEs = moviesEs[0];
var movie = movies[0]
var p1 = document.querySelector('#phrase1');
var p2 = document.getElementById('phrase2');
var p3 = document.querySelector('#phrase3');
var submit = document.querySelector('#submit');
var dataList = document.getElementById('options');
var langChange = document.getElementById('lang');
var titles = [];
var lang = "EN"

startGame();


//Start Game with movie of the Day
function startGame() {
    titleOptions();
    select();
    p1.append(movie.phrase1);
}


//Select movies
function select() {
    while (day >= movies.length) {
        day = day - movies.length;
        console.log(day);
    }
    movie = movies[day - 1];
    console.log(movie);
    movieEs = moviesEs[day - 1];
}

//EventListener
submit.addEventListener('click', check);
langChange.addEventListener('click', changeLanguage);

//Autocomplete English
function titleOptions() {
    dataList.innerHTML = "";
    for (let i in movies) {
        titles[i] = movies[i].title;
        dataList.insertAdjacentHTML("afterbegin", `<option value="${titles[i]}"></option>`)
    }
}

//Autocomplete Spanish
function titleOptionsEs() {
    dataList.innerHTML = "";
    for (let i in moviesEs) {
        titles[i] = moviesEs[i].title;
        dataList.insertAdjacentHTML("afterbegin", `<option value="${titles[i]}"></option>`)
    }
}

//Change Language
function changeLanguage() {
    if (lang == "EN") {
        langChange.innerHTML = "Change to English";
        submit.setAttribute("value", "Enviar");
        lang = "ES";
        p1.innerHTML = "";
        p1.append(movieEs.phrase1);
        if (p2.innerHTML != '') {
            p2.innerHTML = '';
            p2.append(movieEs.phrase2);
        }
        if (p3.innerHTML != '') {
            p3.innerHTML = '';
            p3.append(movieEs.phrase3);
        }
        titleOptionsEs();
    } else {
        langChange.innerHTML = "Cambiar a Español";
        submit.setAttribute("value", "Submit");
        lang = "EN";
        p1.innerHTML = "";
        p1.append(movie.phrase1);
        if (p2.innerHTML != '') {
            p2.innerHTML = '';
            p2.append(movie.phrase2);
        }
        if (p3.innerHTML != '') {
            p3.innerHTML = '';
            p3.append(movie.phrase3);
        }
        titleOptions();
    }
}

//Check the answer
function check() {
    var attempt = document.getElementById('title').value;
    if (attempt == movie.title || attempt == movieEs.title) {
        win();
    } else {
        if (p2.innerHTML == '') {
            (lang == "EN") ? p2.append(movie.phrase2) : p2.append(movieEs.phrase2);
        } else if (p3.innerHTML == '') {
            (lang == "EN") ? p3.append(movie.phrase3) : p3.append(movieEs.phrase3);
        } else {
            lose();
        }
    }
}

//Win function
function win() {
    if (lang == "EN") {
        parent = phrase1.parentNode;
        parent.parentNode.innerHTML = `
    <div class="header">
        <h1>${movie.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movie.img}">
    </div>
    <div class="result">
        <h3>Congratulations!</h3>
    </div>
    `;
    } else {
        parent = phrase1.parentNode;
        parent.parentNode.innerHTML = `
    <div class="header">
        <h1>${movieEs.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movieEs.img}">
    </div>
    <div class="result">
        <h3>Felicidades!</h3>
    </div>
    `;
    }
}

//Lose function
function lose() {
    if (lang == "EN") {
        parent = phrase1.parentNode;
        parent.parentNode.innerHTML = `
    <div class="header">
        <h1>${movie.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movie.img}">
    </div>
    <div class="result">
        <h3>You lose!</h3>
    </div>
    `;
    } else {
        parent = phrase1.parentNode;
        parent.parentNode.innerHTML = `
    <div class="header">
        <h1>${movieEs.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movieEs.img}">
    </div>
    <div class="result">
        <h3>Perdiste!</h3>
    </div>
    `;
    }
}


