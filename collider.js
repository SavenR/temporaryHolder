
////// GAMEBOARD //////
// Define the dimensions for .gameCanvas
var canvasSize = {
    x: 450,
    y: 300
};

// Linking the DOM .gameCanvas to a JS variable using the D3 select method (d3.select(...))
var gameCanvas = d3.select('#gameCanvas');

// Using d3's jQ like functionality to update the canvas' dimensions
gameCanvas.attr('height', canvasSize.y).attr('width', canvasSize.x);


////// HERO //////

var hero = d3.select('#hero'),
    heroRadius = 5;
hero.data([{id: 7, x: canvasSize.x/5, y: canvasSize.y/5}]);
hero.attr('cy', .5*canvasSize.y).attr('cx', .5*canvasSize.x).attr('r', heroRadius);
// console.log(hero)


////// ENEMY DATA ARRAY //////
// Enemy radius
var radius = 5,
    numbOfEnemies = 1;

// this will randomly generate the circle's x and y coordinates
coordinateGenerator = function( maxVal ){
    return Math.floor(Math.random()*(maxVal+1))
}

// Creates an array of enemies
enemyArmadaGenerator = function(numb){
    var enemiesAr = [];

    for ( var i = 0; i<numb ; i++ ){
        enemiesAr.push({
            id: i,
            x: radius + coordinateGenerator(canvasSize.x - 2*radius),
            y: radius + coordinateGenerator(canvasSize.y - 2*radius)
        });
    }

    return enemiesAr
}

// returns enemy ids from arrays of data and bind it
enemyUpdate = function( data ){
    d3.selectAll('.enemy').data(data, function(d){ return d.id })
    // for ( var enemy in set ) {
    //     // console.log( enemy )
    // }
}

// Initial generation of enemies array
var enemies = enemyArmadaGenerator(numbOfEnemies);


// Create enter function
var allEnemies = d3.select('#gameCanvas').selectAll('.enemy').data(enemies)//.attr('r', radius)

allEnemies.enter().append('circle').attr('r', radius).attr('class', 'enemy').each(enemyActivity);

// Set initial positions
d3.selectAll('.enemy')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    // .each(enemyActivity(1000))
    ;


////// TRANSITION //////
function enemyActivity(){
    var frequency = 1000
    var enemy = d3.select(this);
    console.log(enemy);

    (function move(){
        enemy = enemy
        .transition()
        // .delay(frequency)
        .duration(frequency)
        .attr('cx', function() {
            // console.log(enemyUpdate(allEnemies))
            return radius + coordinateGenerator(canvasSize.x - 2*radius)
        })
        .attr('cy', function() {
            // console.log(enemyUpdate(allEnemies))
            return radius + coordinateGenerator(canvasSize.y - 2*radius)
        })
                    // .attr("stroke-width", 2)
                    // .attr("r", 10)
                    // .transition()
                    // .duration(500)
                    // .attr('stroke-width', 0.5)
                    // .attr("r", 5)
                    // .ease('sine')
        .each('end', move);
    })()
    // console.log(frequency)
}


////// DRAGGING //////

// Define basic drag behavior
var dragmove = function(d){
    // console.log(d);
    d3.select(this)
        .attr('cx', d.x = Math.max(radius, Math.min(canvasSize.x - radius, d3.event.x)))
        .attr('cy', d.y = Math.max(radius, Math.min(canvasSize.y - radius, d3.event.y)));
    // console.log('after');
};

var anyDrag = d3.behavior.drag()
    //.origin(function(d) { return d})
    .on("drag", dragmove);



anyDrag.call(hero);


////// COLLISION AND SCORES //////


var collisionChecker = function(){
    var highScoreEl = d3.select('#highScore')
    highScore = Number(highScoreEl.text());
    score = Number(d3.select('#currentScore').text());


    if ( score > highScore ){
        highScore = score;
        highScoreEl.text(highScore);
    };

    allEnemies.each(function(){
        console.log('collisionChecker')
    })

}

collisionChecker()

//  225 Bush St Fl 12, RocketU, San Francisco, CA 94104-4254, United States
// d3.selectAll('circle').attr('fill', '#FFF');









