'use strict';

class Cluster {

    constructor(id) {
        this.id = id;
        this.points = [];
        this.centroid = null; //Point
    }


    addPoint(point) {
        this.points.push(point);
    }

    plotCluster() {
        let centroid = {
            x: this.centroid.x,
            y: this.centroid.y,
            cluster_number: this.centroid.cluster_number
        }
        return {
            id: this.id,
            centroid: centroid,
            points: this.points
        }
    }

}