function predictPartyVictory(senate: string): string {
    const rQueue:number[] = []
    const dQueue:number[] = []

    for (const i in Array.from(senate)) senate[i] === "R" ? rQueue.push(parseInt(i)) : dQueue.push(parseInt(i))
       
    while(rQueue.length && dQueue.length){
        const r = rQueue.shift()!
        const d = dQueue.shift()!

        r < d ? rQueue.push(r+senate.length) : dQueue.push(r+senate.length)
    }

    return rQueue.length ? "Radiant" : "Dire"
};


console.log(predictPartyVictory("DR"))
console.log((1-0.71).toFixed(3))