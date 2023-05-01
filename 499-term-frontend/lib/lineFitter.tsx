// The LineFitter class is used for projecting future data from past data on a line graph
// by fitting a linear regression model.
export class LineFitter {
  // The number of data points added to the line fitter.
  count: number;
  // The sum of all X values added to the line fitter.
  sumX: number;
  // The sum of all squared X values added to the line fitter.
  sumX2: number;
  // The sum of the product of corresponding X and Y values added to the line fitter.
  sumXY: number;
  // The sum of all Y values added to the line fitter.
  sumY: number;

  // Initializes the properties of the LineFitter class.
  constructor() {
    this.count = 0;
    this.sumX = 0;
    this.sumX2 = 0;
    this.sumXY = 0;
    this.sumY = 0;
  }

  // Adds a new data point (x, y) to the line fitter and updates the properties accordingly.
  add(x: number, y: number) {
    this.count++;
    this.sumX += x;
    this.sumX2 += x * x;
    this.sumXY += x * y;
    this.sumY += y;
  }

  // Projects the Y value for a given X value using the linear regression model.
  project(x: number) {
    let det = this.count * this.sumX2 - this.sumX * this.sumX;
    let offset = (this.sumX2 * this.sumY - this.sumX * this.sumXY) / det;
    let scale = (this.count * this.sumXY - this.sumX * this.sumY) / det;
    return Math.max(offset + scale * x, 0);
  }
}

// The linearProject function is a utility function that takes an array of Y values (data)
// and a new X value (x) as input, fits a linear regression model to the data, and
// projects the corresponding Y value for the given X value using the LineFitter class.
export function linearProject(data: number[], x: number) {
  let fitter = new LineFitter();
  data.forEach((y, i) => fitter.add(i, y));
  return fitter.project(x);
}
