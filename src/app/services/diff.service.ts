import { Injectable } from '@angular/core';
import { DiffData } from '../models/diff-data';
import { Point2d } from '../models/point2d';

@Injectable()
export class DiffService {

  discretize(diffData: DiffData, countPoints: number): Point2d[] {
    let points: Point2d[] = [];

    let h: number = (diffData.rightLimit - diffData.leftLimit) / (countPoints - 1); // step
    let cp = +diffData.leftLimit; // current position

    for (let i = 0; i < countPoints; ++i) {
      let point = new Point2d();
      point.x = cp;
      point.y = diffData.function(cp);
      points.push(point);
      cp += h;
    }

    return points;
  }

  getMethodPoints(points: Point2d[]): Point2d[] {
    return points.map(p => {
      let np = new Point2d(); // new point
      np.x = p.x;

      let sign = this.getRandomInt(0, 1);
      let randInt = this.getRandomInt(1000000000, 1300000000);

      if (sign) {
        np.y = p.y + randInt / 10000000000;
      } else {
        np.y = p.y - randInt / 10000000000;
      }

      return np;
    });
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
