export function getMinute(time){
    return Math.floor(time / 60);
  }
  
export function getSeconds(time){
    let seconds = time - getMinute(time) * 60;
    if(Math.floor(seconds / 10) < 1){ 
        return singleDigitSeconds(seconds);
    } else {
        return seconds;
    }
}
  
function singleDigitSeconds(seconds){
    return "0" + seconds;
}

export function formatDateTime(date){
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}