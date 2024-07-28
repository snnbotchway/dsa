function findCircleNum(isConnected: number[][], visited = new Set<number>()): number {
    let provinces = 0

    for (let i = 0; i < isConnected.length; i++){
        if(visited.has(i)) continue

        provinces++
        dfs(isConnected, visited, i)
    }

    return provinces
};

const dfs = (isConnected:number[][], visited: Set<number>, city:number)=>{
    const connections = isConnected[city]

    for (let i = 0; i < connections.length; i++){
        if(!connections[i] || visited.has(i)) continue

        visited.add(i)
        dfs(isConnected, visited, i)
    } 

}

console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]]))
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]]))
console.log(findCircleNum([[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]]))
// visited - 0
// i = 0
// j = 0
// prov = 0