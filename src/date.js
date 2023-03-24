const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

export const today = dayOfYear(new Date());

setInterval(() =>{
    var date = new Date();
    var clock = document.getElementById('clock');
    var hour = 23 - date.getHours();
    var minutes = 60 - date.getMinutes();
    var seconds = 60 - date.getSeconds();

    if(hour < 10) {
        hour = `0${hour}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(seconds < 10) {
        seconds = `0${seconds}`;
    }

    clock.innerHTML = `${hour}:${minutes}:${seconds}`;
}, 1000);
