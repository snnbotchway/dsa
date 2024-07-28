function combinationSum3(k: number, n: number): number[][] {
  const res: number[][] = [];

  function backtrack(currentNum: number, combination: number[], target: number) {
    if (combination.length === k) {
      if (!target) res.push(combination);
      return;
    }

    for (let i = currentNum + 1; i <= 9; i++) if (i <= target) backtrack(i, [...combination, i], target - i);
  }

  backtrack(0, [], n);

  return res;
}

console.log(combinationSum3(3, 9));

// backtrack(0,[],9)  k=3, n=9
//     backtrack(1,[1],8)
//         backtrack(2,[1,2],6)
//             backtrack(3,[1,2,3],3)
//             end
//             backtrack(4,[1,2,4],2)
//             end
//             backtrack(5,[1,2,5],1)
//             end
//             backtrack(6,[1,2,6],0)
//             res = [[1,2,6]]
//             end
//         backtrack(3,[1,3],5)
//             backtrack(4,[1,3,4],1)
//             end
//             backtrack(5,[1,3,5],0)
//             res = [[1,2,6],[1,3,5]]
//             end
//         backtrack(4,[1,4],4)
// CONTINUE...

//         backtrack(5,[1,5],3)
//         backtrack(6,[1,6],2)
//         backtrack(7,[1,7],1)
//         backtrack(8,[1,8],0)
//     end
//     backtrack(2,[2],7)
//     backtrack(3,[3],6)
//     backtrack(4,[4],5)
//     backtrack(5,[5],4)
//     backtrack(6,[6],3)
//     backtrack(7,[7],2)
//     backtrack(8,[8],1)
//     backtrack(9,[],0)
// end
