// @TODO: YOUR CODE HERE!

//find data
var filepath = "../data/data.csv";


function makeResponsive(theData) {

//new svg area & clear old
    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
    }
// svg size
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    };

    // create margins
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    //add svg to the html
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth)
        .attr("class","chart");
    svg.append("g").attr("class","xText");
    var xText = d3.select(".xText");

    xText.append("text")
        .attr("date-name","poverty")
        .attr("data-axis","x")
        .text("In Poverty (%)");

    yText.append("text")
        .attr("date-name","healthcare")
        .attr("date-axis","y")
        .text("Lacks Healthcare (%)");


    //load data
    d3.csv(filepath).then((data) => {
                                        //Tooltip d3-tip.js tooltip rules
        //find data we need
        data.forEach(function(data) {
            data.state = data.state;
            data.abbr = data.abbr;
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
            data.smokes = +data.smokes;
            data.age = +data.age;
        });
    });

    console.log(data);
    var xMin;
    var yMin;
    var xMax;
    var yMax;
    function xMinMax(){
        xMin= d3.min(theData,function(d){
            return parseFloat(d["poverty"]);
        });
        xMax= d3.max(theData, function(d){
            return parseFloat(d["poverty"]);
        });
    }
    function yMinMax(){
        yMin= d3.min(theData,function(d){
            return parseFloat(d["healthcare"]);
        });
        yMax= d3.max(theData, function(d){
            return parseFloat(d["healthcare"]);
        });
    }
    //create x axis
    var xLinearScale = d3.scaleLinear()
                        .domain([xMin,xMax])
                        .range([0, width]);

    //create y axis
    var yLinearScale = d3.scaleLinear()
                        .domain([yMin,yMax])
                        .range([0, width]);

    //make corners
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    //add chart to svg
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    //add data to the chart
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.rank))
        .attr("r", 8)
        .attr("fill", "green")
        .attr("stroke-width", .5)
        .attr("stroke", "green")
        .text(function(data){
            return d.abbr;
        })
        .attr("dx",function(data){
            return xLinearScale(data["Poverty"])
        })
        .attr("dy",function(data) {
            return yLinearScale(data["Heathcare"])
        });

}