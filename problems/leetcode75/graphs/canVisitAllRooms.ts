function canVisitAllRooms(rooms: number[][],visited = new Set<number>([0]), room = 0 ): boolean {
    visited.add(room)

    for (const key of rooms[room]){
        if(visited.has(key)) continue
        canVisitAllRooms(rooms, visited, key)
    }

    return visited.size == rooms.length
};

console.log(canVisitAllRooms([[1],[2],[3],[]]))
                            // 0 , 1,  2, 4
console.log(canVisitAllRooms([[1,3],[3,0,1],[2],[0]]))
