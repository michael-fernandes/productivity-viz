export default (actionFocus) => {
    if(actionFocus === undefined) {
        //if no action focuses yet
        return [];
    }
    
    let focus = [];
    let focuses = { ...actionFocus};

    let keys = Object.keys(focuses);
    for(let i = 0; i< keys.length; i++) {
        focus.push(focuses[keys[i]])
    }

    focus.sort(function(a, b){return  b.key - a.key });
    return focus
}

