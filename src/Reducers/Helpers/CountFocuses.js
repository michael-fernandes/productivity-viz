// Helper function seemed better suited to be placed here rather than in or next to a React Component.
export default (focuses) => {
    let complete = 0; 
    let incomplete = 0;
    let prevDate = null;
    for(let i = 0; i < focuses.length; i++){
        if(!focuses[i].hidden){
            if(focuses[i].isComplete) {
                complete += 1;  
            } else {
                incomplete += 1;
            }
        }
        focuses[i].dateTag = dateHandler(focuses[i].date, prevDate);
        
        prevDate = focuses[i].date;
    }

    return({ complete:complete, incomplete:incomplete });
}

const weekDay = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
const monthName = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

const dateHandler = (cd, pd) => {
    let currDate = new Date(cd);
    if(pd === null ){
        let today = new Date();
        if(currDate.getDate() === today.getDate() && currDate.getMonth() === today.getMonth() && currDate.getFullYear() === today.getFullYear()){
            return "Today"
        }
        else {
            return getDateName(currDate);
        }
    }
    let prevDate = new Date(pd);

    if(currDate.getDate() !== prevDate.getDate()) {
        return getDateName(currDate);
    } else {
        return null
    }
}

const getDateName = (d) => {
    let date = new Date(d);
    return weekDay[date.getDay()] + ", " + monthName[date.getMonth()] + " " + date.getDate();
}


