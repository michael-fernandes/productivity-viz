export default (focuses) =>{
    let counts = {};
    for(let i = 0; i < focuses.length; i++){
        if(!focuses[i].hidden){
            let distraction = focuses[i].distraction;
            if(counts[distraction] === undefined){
                counts[distraction] = 0;
            }

            counts[distraction] += 1;
        }
    }

    return counts
}

