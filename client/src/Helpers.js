
export function caps(text) {
    if(text){
        let wordsArray = text.toLowerCase().split(' ')
        let capsArray = wordsArray.map(word=>{
            return word[0].toUpperCase() + word.slice(1)
        })
        return capsArray.join(' ')
    };
};

export function sortByName(arr){
    arr.sort((a,b) => { 
        if( a.name > b.name ){
            return 1;
        }else if( a.name < b.name ){
            return -1;
        }else{
            return 0;
        }
    });
    return arr;
};

export function sortByRate(arr){
    arr.sort((a,b) => {
        return b.rate - a.rate
    });
    return arr;
};


export default {
    caps , 
    sortByName,
    sortByRate
};