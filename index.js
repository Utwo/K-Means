let NUM_CLUSTERS = 5;
let NUM_POINTS = 100;
let MIN_COORDINATE = 0;
let MAX_COORDINATE = 12;
let MULTIPLY = 40;
let colors = [];

let graph = $('#graph')
let next_btn = $('#next')
let iteration_txt = $('#iteration')

$(graph).width(MAX_COORDINATE * MULTIPLY);
$(graph).height(MAX_COORDINATE * MULTIPLY);

for(let i = 0; i < NUM_POINTS; i++){
    colors.push(getRandomColor())
}

let kmeans = new KMeans(NUM_CLUSTERS, NUM_POINTS, MIN_COORDINATE, MAX_COORDINATE);
kmeans.initialize();
let iterations = kmeans.calculate();

let step_number = 0;
$(next_btn).click(function () {
    //console.log(iterations[step_number])
    if (iterations.length > step_number) {
        clear_graph();
        $(iteration_txt).text(iterations[step_number].iteration);
        for (let cluster of iterations[step_number].cluster) {
            add_point('centroid', cluster.centroid.x, cluster.centroid.y, cluster.id)
            for (let point of cluster.points) {
                add_point('point', point.x, point.y, cluster.id)
            }
        }
        step_number++;
    } else {
        $(iteration_txt).text('Finish!');
    }
})

function clear_graph() {
    $(graph).children().fadeOut(1200).empty();
}

function add_point(class_name, x, y, cluster) {
    let point = $('<li></li>').css({
        left: x * MULTIPLY,
        top: y * MULTIPLY,
        width: MULTIPLY / 2,
        height: MULTIPLY / 2,
        background: colors[cluster]
    }).addClass(`graph_item ${class_name}`);
    $(point).appendTo(graph).hide().fadeIn(600);;
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
