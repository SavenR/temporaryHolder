
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
hero.attr('cy', 0.5*canvasSize.y).attr('cx', 0.5*canvasSize.x).attr('r', heroRadius);
// console.log(hero)


////// ENEMY DATA ARRAY //////
// Enemy radius
var radius = 5,
    numbOfEnemies = 30;

// this will randomly generate the circle's x and y coordinates
coordinateGenerator = function( maxVal ){
    return Math.floor(Math.random()*(maxVal+1));
};

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

    return enemiesAr;
};

// returns enemy ids from arrays of data and bind it
enemyUpdate = function( data ){
    d3.selectAll('.enemy').data(data, function(d){ return d.id; });
    // for ( var enemy in set ) {
    //     // console.log( enemy )
    // }
};

// Initial generation of enemies array
var enemies = enemyArmadaGenerator(numbOfEnemies);


// Create enter function
var allEnemies = d3.select('#gameCanvas').selectAll('.enemy').data(enemies);

allEnemies.enter().append('circle').attr('r', radius).attr('class', 'enemy').each(enemyActivity);

// Set initial positions
d3.selectAll('.enemy')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    // .each(enemyActivity(1000))
    ;


////// TRANSITION //////
var score = 0,
    highScore = 0;

function enemyActivity(){
    var frequency = 1500;
    var enemy = d3.select(this);



    (function move(){
        enemy = enemy
        .transition()
        // .delay(frequency)
        .duration(frequency)
        .attr('cx', function() {
            // console.log(enemyUpdate(allEnemies))
            return radius + coordinateGenerator(canvasSize.x - 2*radius);
        })
        .attr('cy', function() {
            // console.log(enemyUpdate(allEnemies))
            return radius + coordinateGenerator(canvasSize.y - 2*radius);
        })
        .tween('perimeterCheck', function(d, i){
            // console.log('tween\'s factory')
            return function(){
                var highScoreEl = d3.select('#highScore'),
                    scoreEl = d3.select('#currentScore');

                    score = score +1/numbOfEnemies/4 ;
                    scoreEl.text(Math.floor(score));

                if ( Math.floor(score) > highScore ){
                    highScore = Math.floor(score);
                    highScoreEl.text(highScore);
                }

                allEnemies.each(function(){
                        // var heroR = heroRadius,
                    // enemyR = radius;
                    var enemy = d3.select(this);
                    var totRad = heroRadius + radius;
                    var enemyX = enemy.attr('cx'),
                        enemyY = enemy.attr('cy');
                    var heroX = hero.attr('cx'),
                        heroY = hero.attr('cy');
                    var dist = Math.pow((Math.pow((heroX-enemyX),2) + Math.pow((heroY-enemyY),2)), 0.5);

                    if ( dist < totRad ){
                        // console.log('should lose. Score: ' + score);
                        // scoreBarGraph
                        if (score > 20){
                            // console.log('score > 20' + score)

                            barScores.push({game: gamesPlayed, gameScore: Math.floor(score), hScore: highScore === Math.floor(score)});
                            gamesPlayed++;
                            updateFunction(barScores);
                            // console.log(highScore + "vs" + highScoreEl.text())
                        }
                        score = 0;
                        scoreEl.text(0);

            }

    });

};

        })
        .each('end', move);
    })();
    // console.log(frequency)
}


////// DRAGGING //////

// Define basic drag behavior
var dragmove = function(d){

    d3.select(this)
        .attr('cx', d.x = Math.max(heroRadius, Math.min(canvasSize.x - heroRadius, d3.event.x)))
        .attr('cy', d.y = Math.max(heroRadius, Math.min(canvasSize.y - heroRadius, d3.event.y)));
    // collisionChecker()
};

var anyDrag = d3.behavior.drag()
    //.origin(function(d) { return d})
    .on("drag", dragmove);



anyDrag.call(hero);


////// COLLISION AND SCORES //////





//  225 Bush St Fl 12, RocketU, San Francisco, CA 94104-4254, United States
// d3.selectAll('circle').attr('fill', '#FFF');









