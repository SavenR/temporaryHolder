// http://bl.ocks.org/mbostock/3808218

var barScores = [],
    gamesPlayed = 1;
    // sampleData = [
    //     {game: 1, gameScore: 41, hScore: true},
    //     {game: 2, gameScore: 1051, hScore: true},
    //     {game: 3, gameScore: 179, hScore: false},
    //     {game: 4, gameScore: 185, hScore: false},
    //     {game: 5, gameScore: 138, hScore: false},
    //     {game: 6, gameScore: 717, hScore: false},
    //     {game: 7, gameScore: 1140, hScore: true},
    //     {game: 8, gameScore: 223, hScore: false},
    // ],
    // sampleHS = 4000


var score = 0,
    highScore = 0;

// Create a bar graph holder
// identify the holder
var scoreGraphHolder = d3.select('#scoreGraphContainer'),
    graphWidth = scoreGraphHolder.style('width');


// Bind the data

var scoreBars = scoreGraphHolder.selectAll('.scoreBar')
.data(barScores);

// Enter the flow
scoreBars.enter()
.insert('div', ':first-child')
// .append('div')
.style('width', function(d){
    return '' + d.gameScore / highScore * parseInt(graphWidth) + 'px';
})
.attr('class', 'scoreBar')
.text(function(d){
    // return 'Round ' + d.game + ': ' + d.gameScore + ' points'
    return d.gameScore + ' pts';
})
.style('background-color', function(d){
    if (d.hScore){
        return '#f2cb02';
    }
    return "";
});



// Update the flow
var updateFunction = function(updatedData){
    // Creates a new selection with new bound data
    var bars = scoreGraphHolder.selectAll('.scoreBar').data(updatedData);


    // Update any old elements as needed
    bars
    .transition()
    .duration(1200)
    .style('width', function(d, i){
            var thisBar = d3.select(this).text();
            // console.log(thisBar)
            // console.log(d.gameScore)
            return '' + parseInt(thisBar) / highScore * parseInt(graphWidth) + 'px';
        });


    // Create new elements as needed
    bars
    .enter()
    .insert('div', ':first-child')
    .transition()
    .duration(500)
    .style('width', function(d){
            return '' + d.gameScore / highScore * parseInt(graphWidth) + 'px';
        })
    .style('height', '25px')
    .attr('class', 'scoreBar')

    .style('background-color', function(d){
            if (d.hScore){
                return '#f2cb02';
            }
            return "";
        })

    .each('end', function(d){
        d3.select(this).text(function(d){
            return d.gameScore + ' pts';
        });
    });
    // .append('div')
    // bars.select('div', ':first-child').text(function(d){
    //         // return 'Round ' + d.game + ': ' + d.gameScore + ' points'
    //         return d.gameScore + ' pts'
    //     })


};

// updateFunction(sampleData)
// Create a callable function that will update the bar graph


// <<<<<<<<<<<<<<<<<<<<
// BLINK HERO until score >=20

// >>>>>>>>>>>>>>>>>>>>


// var sampleUpdate = function(gameScore, hScore){
//     sampleData.push({game: sampleData.length + 1, 'gameScore': gameScore, 'hScore': hScore})
// }
// sampleUpdate(124, false);
// sampleUpdate(400, false);
// sampleUpdate(4000, true);