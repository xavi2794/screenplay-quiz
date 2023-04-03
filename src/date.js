var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
export var dayNumber = day;



setInterval(() =>{
    var date = new Date();
    var clock = document.getElementById('clock');
    var hour = 23 - date.getHours();
    var minutes = 59 - date.getMinutes();
    var seconds = 59 - date.getSeconds();

    if(hour < 10) {
        hour = `0${hour}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(seconds < 10) {
        seconds = `0${seconds}`;
    }
    if(hour == '00' && minutes == '00' && seconds == '00'){
        window.location.reload();
        localStorage.setItem("game", 0);
    }
    if(clock != null){
        clock.innerHTML = `${hour}:${minutes}:${seconds}`;
    }
}, 1000);
