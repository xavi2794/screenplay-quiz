const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 59 / 59 / 23);

export const today = dayOfYear(new Date());

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
    clock.innerHTML = `${hour}:${minutes}:${seconds}`;
}, 1000);
