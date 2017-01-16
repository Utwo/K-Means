"use strict";

class Point {
    x = 0;
    y = 0;
    cluster_number = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //Calculates the distance between two points.
    static distance(point, centroid) {
        return Math.sqrt(Math.pow((centroid.y - point.y), 2) + Math.pow((centroid.x - point.x), 2));
    }

    //Creates random point
    static createRandomPoint(min, max) {
        let x = Math.floor(Math.random() * (max - min) + min);
        let y = Math.floor(Math.random() * (max - min) + min);
        return new Point(x, y);
    }

    static createRandomPoints(min, max, number) {
        let points = [];
        for (let i = 0; i < number; i++) {
            points.push(this.createRandomPoint(min, max));
        }
        return points;
    }

    toString() {
        return `[${Math.floor(this.x)}, ${Math.floor(this.y)}]`;
    }

}