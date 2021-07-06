function inArray(array1, array2) {
    let r =[];
    let b = [];
    let ar = array1.map(word => array2.map(bword => bword.includes(word) ? word : ''))
    for(let arr of ar) {
        for (let word of arr) {
            if(word) {
                b.push(word)
            }
        }
    }
    for (let word of b) {
        if(!r.includes(word)) {
            r.push(word);
        }
    }
    return r.sort()
}

let a1 = ["arp", "live", "strong"]

let a2 = ["lively", "alive", "harp", "sharp", "armstrong"]

//returns["arp", "live", "strong"]

console.log(inArray(a1, a2));