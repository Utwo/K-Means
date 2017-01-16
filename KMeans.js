"use strict";

class KMeans {
    NUM_CLUSTERS;
    //Number of Points
    NUM_POINTS;
    //Min and Max X and Y
    MIN_COORDINATE;
    MAX_COORDINATE;

    points = [];
    clusters = [];
    history = [];

    constructor(NUM_CLUSTERS, NUM_POINTS, MIN_COORDINATE, MAX_COORDINATE) {
        this.NUM_CLUSTERS = NUM_CLUSTERS;
        this.NUM_POINTS = NUM_POINTS;
        this.MIN_COORDINATE = MIN_COORDINATE;
        this.MAX_COORDINATE = MAX_COORDINATE;
    }


    initialize() {
        this.points = Point.createRandomPoints(this.MIN_COORDINATE, this.MAX_COORDINATE, this.NUM_POINTS);

        for (let i = 0; i < this.NUM_CLUSTERS; i++) {
            let cluster = new Cluster(i);
            cluster.centroid = Point.createRandomPoint(this.MIN_COORDINATE, this.MAX_COORDINATE);
            this.clusters.push(cluster);
        }

        let plot = this.plotClusters();
        this.history.push({
            iteration: 0,
            centroid_dist: 0,
            cluster: plot
        })
    }

    plotClusters() {
        let c = [];
        for (let cluster of this.clusters) {
            c.push(cluster.plotCluster());
        }
        return c;
    }

    //The process to calculate the K Means, with iterating method.
    calculate() {
        let finish = false;
        let iteration = 0;

        // Add in new data, one at a time, recalculating centroids with each new one.
        while (!finish) {
            //Clear cluster state
            this.clearClusters();

            let lastCentroids = this.getCentroids();

            //Assign points to the closer cluster
            this.assignCluster();

            //Calculate new centroids.
            this.calculateCentroids();

            iteration++;

            let currentCentroids = this.getCentroids();

            //Calculates total distance between new and old Centroids
            let distance = 0;
            for (let i = 0; i < lastCentroids.length; i++) {
                distance += Point.distance(lastCentroids[i], currentCentroids[i]);
            }

            let plot = this.plotClusters();
            this.history.push({
                iteration: iteration,
                centroid_dist: distance,
                cluster: plot
            })

            if (distance == 0) {
                finish = true;
            }
        }
        return this.history;
    }

    clearClusters() {
        for (let cluster of this.clusters) {
            cluster.points = [];
        }
    }

    getCentroids() {
        let centroids = [];
        for (let cluster of this.clusters) {
            let point = new Point(cluster.centroid.x, cluster.centroid.y);
            centroids.push(point);
        }
        return centroids;
    }

    assignCluster() {
        let max = 999999;
        let min;
        let cluster = 0;
        let distance = 0.0;

        for (let point of this.points) {
            min = max;
            for (let i = 0; i < this.NUM_CLUSTERS; i++) {
                let c = this.clusters[i];
                distance = Point.distance(point, c.centroid);
                if (distance < min) {
                    min = distance;
                    cluster = i;
                }
            }
            point.cluster_number = cluster;
            this.clusters[cluster].addPoint(point);
        }
    }

    calculateCentroids() {
        for (let cluster of this.clusters) {
            let sumX = 0;
            let sumY = 0;
            let list = cluster.points;
            let n_points = list.length;

            for (let point of list) {
                sumX += point.x;
                sumY += point.y;
            }

            if (n_points > 0) {
                let newX = sumX / n_points;
                let newY = sumY / n_points;
                cluster.centroid.x = newX;
                cluster.centroid.y = newY;
            }
        }
    }

}