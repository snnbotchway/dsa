function decodeStringDep(s: string): string {
    const stack:[number, string][] = []
    let currentString = ''
    let currentMultiplier = 0

    for (const ch of s){
        if(!isNaN(Number(ch))) {
            currentMultiplier = !currentMultiplier ? Number(ch) : Number(currentMultiplier.toString()+ch)
        }else if (ch === "["){
            stack.push([currentMultiplier, currentString])
            currentString =''
            currentMultiplier =0
        }else if(ch === "]"){
            const [prevMultiplier, prevString] = stack.pop()!
            currentString = prevString + currentString.repeat(prevMultiplier)
        }else{
            currentString += ch
        }
    }

    return currentString
};


function decodeString(s: string) {
    const stack: string[] = []

    for (const ch of s){
        if (ch!="]"){
            stack.push(ch)
            continue
        }
        
        let currentString = ""

        while(stack.slice(-1)[0] !== "[") currentString = stack.pop() + currentString
        stack.pop()
        
        let multiplier:number|string = ""
        while(!isNaN(Number(stack.slice(-1)[0]))) multiplier = stack.pop() + multiplier

        multiplier = Number(multiplier)
        stack.push(currentString.repeat(multiplier))
    }
    
    return stack.join('')
};


console.log(decodeString("3[a2[cdef]]"))