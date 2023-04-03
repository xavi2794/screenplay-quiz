import { movies } from "./library.js";
import { moviesEs } from "./film-es.js";
import { dayNumber } from "./date.js";

//Declare variables
var dayOfYear = dayNumber;
var movieEs = moviesEs[0];
var movie = movies[0];
var p1 = document.querySelector('#phrase1');
var p2 = document.getElementById('phrase2');
var p3 = document.querySelector('#phrase3');
var submit = document.querySelector('#submit');
var dataList = document.getElementById('options');
var langChange = document.getElementById('lang');
//var title = document.getElementsByClassName('title');
var result = document.getElementsByClassName('result');
var titles = [];
var lang = "EN";

function checkProgress() {
    if (localStorage.getItem("game") == null) {
        localStorage.setItem("game", 0);
        startGame();
    } else {
        select();
        if (localStorage.getItem("game") == "win"){
            win();
        }
        if (localStorage.getItem("game") == "lose"){
            lose();
        }
        titleOptions();

        p1.append(movie.phrase1);
        if (localStorage.getItem("game") == 1) {
            p2.append(movie.phrase2);
        }
        if (localStorage.getItem("game") == 2) {
            p2.append(movie.phrase2);
            p3.append(movie.phrase3);
        }
    }
}

function checkDay(){
    if(localStorage.getItem("dayChallenge") == null){
        localStorage.setItem("dayChallenge", dayOfYear);
    }

    if(localStorage.getItem("dayChallenge") != dayOfYear){
        localStorage.clear();
        localStorage.setItem("dayChallenge", dayOfYear);
    }
    checkProgress();
}

checkDay();


//Start Game with movie of the Day
function startGame() {
    titleOptions();
    select();
    p1.append(movie.phrase1);
}


//Select movies
function select() {
    while (dayOfYear >= movies.length) {
        dayOfYear = dayOfYear - movies.length;
    }
    movie = movies[dayOfYear];
    movieEs = moviesEs[dayOfYear];
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
        let title = document.getElementById('title');
        if (title.innerHTML == movie.title){
            title.innerHTML = '';
            title.append(movieEs.title);
        }
        let gameResult = document.getElementById('gameResult');
        if (gameResult.innerHTML == 'Congratulations!'){
            gameResult.innerHTML = '';
            gameResult.append('Felicidades!')
        } else if (gameResult.innerHTML == 'You lose!') {
            gameResult.innerHTML = '';
            gameResult.append('Perdiste!')
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
        let title = document.getElementById('title');
        if (title.innerHTML == movieEs.title){
            title.innerHTML = '';
            title.append(movie.title);
        }
        let gameResult = document.getElementById('gameResult');
        if (gameResult.innerHTML == 'Felicidades!'){
            gameResult.innerHTML = '';
            gameResult.append('Congratulations!')
        } else if (gameResult.innerHTML == 'Perdiste!') {
            gameResult.innerHTML = '';
            gameResult.append('You lose!')
        }
        titleOptions();
    }
}

//Check the answer
function check() {
    var attempt = document.getElementById('title').value;
    if (attempt == movie.title || attempt == movieEs.title) {
        localStorage.setItem("game", "win");
        win();
    } else {
        if (p2.innerHTML == '') {
            if (lang == "EN"){
                p2.append(movie.phrase2);
                localStorage.setItem("game", 1);
                console.log(localStorage.getItem("game"));
            } else {
                p2.append(movieEs.phrase2);
                localStorage.setItem("game", 1);
                console.log(localStorage.getItem("game"));
            }
        } else if (p3.innerHTML == '') {
            if (lang == "EN"){
                p3.append(movie.phrase3);
                localStorage.setItem("game", 2);
                console.log(localStorage.getItem("game"));
            } else {
                p3.append(movieEs.phrase3);
                localStorage.setItem("game", 2);
                console.log(localStorage.getItem("game"));
            }
        } else {
            localStorage.setItem("game", "lose");
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
        <h1 id="title">${movie.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movie.img}">
    </div>
    <div class="result">
        <h3 id="gameResult">Congratulations!</h3>
    </div>
    `;
    } else {
        parent = phrase1.parentNode;
        parent.parentNode.innerHTML = `
    <div class="header">
        <h1 id="title">${movieEs.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movieEs.img}">
    </div>
    <div class="result">
        <h3 id="gameResult">Felicidades!</h3>
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
        <h1 id="title">${movie.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movie.img}">
    </div>
    <div class="result">
        <h3 id="gameResult">You lose!</h3>
    </div>
    `;
    } else {
        parent = phrase1.parentNode;
        parent.parentNode.innerHTML = `
    <div class="header">
        <h1 class="title">${movieEs.title}</h1>
    </div>
    <div class="posterDiv">
        <img class="poster" src="${movieEs.img}">
    </div>
    <div class="result">
        <h3 id="gameResult">Perdiste!</h3>
    </div>
    `;
    }
}


