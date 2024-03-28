function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[0] - b[0]);
  let lastEnd = points[0][1];
  let count = 1;

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] <= lastEnd) {
      lastEnd = Math.min(lastEnd, points[i][1]);
    } else {
      count++;
      lastEnd = points[i][1];
    }
  }

  return count;
}
