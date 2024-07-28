function asteroidCollision(asteroids: number[]): number[] {
  const stack = [asteroids[0]];

  for (let i = 1; i<asteroids.length; i++){
    stack.push(asteroids[i])

    while(stack.length >= 2){
      const lastIndex = stack.length-1
      const lastButOneIndex = stack.length-2

      if(stack[lastIndex] > 0 ||stack[lastButOneIndex] < 0) break

      const lastAbs = Math.abs(stack[lastIndex])
      const lastButOneAbs =  Math.abs(stack[lastButOneIndex])


      if(lastAbs <lastButOneAbs) {
        stack.pop()
        break
      }else if (lastAbs == lastButOneAbs){
        stack.pop()
        stack.pop()
        break
      }else{
        stack[lastButOneIndex] = stack[lastIndex]
        stack.pop()
      }
    }
  }

  return stack;
}

console.log(asteroidCollision([5, 10, -5]));
console.log(asteroidCollision([8, -8]));
console.log(asteroidCollision([10, 2, -5]));
console.log(asteroidCollision([1,-2,-2,-2]))
