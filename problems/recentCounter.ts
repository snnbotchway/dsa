class RecentCounter {
    private requests: number[]

    constructor() {
        this.requests = []
    }

    ping(t: number): number {
        this.requests.push(t)
        const startRange = t-3000


        while(this.requests[0]<startRange) {
            this.requests.shift()
        }
        return this.requests.length
    }
}

const counter = new RecentCounter()
console.log(counter.ping(1))
console.log(counter.ping(300))
console.log(counter.ping(3001))
console.log(counter.ping(3002))