// Load CSV file
let parseTime = d3.timeParse("%Y-%m-%d");

let margin = {top: 30, right: 0, bottom: 30, left: 50};
// Width and height as the inner dimensions of the chart area
let width = 650 - margin.left - margin.right,
    height = 580 - margin.top - margin.bottom;

// Append SVG to the target div
let areasvg = d3.select("#areaChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Append SVG to the target div
let barsvg = d3.select("#barChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/zaatari-refugee-camp-population.csv  ", d => {
    d.population = +d.population; // Convert Population to number
    d.date = parseTime(d.date); // Convert to date

    return d;
}).then( data => {
    // Analyze the dataset in the web console
    console.log(data);
    console.log("Lines: " + data.length)

    DrawareaChart(data);


});
function DrawareaChart(data) {

    let xScale = d3.scaleTime()
        .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
        .range([0, width]);

// Y Scale - Linear Scale
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.population)])
        .range([height, 0]);

    let area = d3.area()
        .x(d => xScale(d.date))
        .y0(height)
        .y1(d => yScale(d.population));

    let path = areasvg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);


    // Define the line generator function
    let line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.population));

// Append the line path
    let linePath = areasvg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    let xAxis = d3.axisBottom(xScale)
        .ticks(d3.timeMonth.every(3))
        .tickFormat(d3.timeFormat("%b %Y"));

    areasvg.append("g")
        .attr("class", "axis-label")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("font-size", "10px")

    let yAxis = d3.axisLeft(yScale)

    areasvg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${0})`)
        .call(yAxis);

    areasvg.append("text")
        .attr("x", width / 2)
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Camp Population");

    let tooltipGroup = areasvg.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);  // Initialize it to be fully transparent (invisible)

    tooltipGroup.append("line")
        .attr("class", "tooltip-line")
        .attr("y1", 10)
        .attr("y2", height)
        .style("stroke", "black")
        .style("stroke-width", "1px");

    let tooltipDate = tooltipGroup.append("text")
        .attr("class", "tooltip-date")
        .attr("x", 10) // Offset from the line
        .attr("y", 45)
        .style("text-anchor", "start");

    let tooltipPopulation = tooltipGroup.append("text")
        .attr("class", "tooltip-population")
        .attr("x", 10) // Offset from the line
        .attr("y", 20) // Further above the date text
        .style("text-anchor", "start");

    areasvg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .style("opacity", 0)  // Invisible overlay
        .on("mousemove", mousemove);

    let bisectDate = d3.bisector(d => d.date).left;

    function mousemove(event) {
        let x0 = xScale.invert(d3.pointer(event)[0]);
        let i = bisectDate(data, x0, 1);
        let selectedData = data[i];

        // Set the position of the tooltip elements
        tooltipGroup.attr("transform", `translate(${xScale(selectedData.date)},0)`);
        tooltipDate.text(d3.timeFormat("%Y-%m-%d")(selectedData.date));
        tooltipPopulation.text(`Population: ${selectedData.population}`);

        // Show the tooltip
        tooltipGroup.style("opacity", 1);
    }

    areasvg.on("mouseout", function(event, d) {
        tooltipGroup.style("opacity", 0);  // Hide the tooltip
    });

}


const shelterData = [
    {
        type: 'Caravans',
        percentage: 79.68
    },
    {
        type: 'Combination',
        percentage: 10.81
    },
    {
        type: 'Tents',
        percentage: 9.51
    }
];

DrawbarChart(shelterData)

function DrawbarChart(data){
    let yScale = d3.scaleLinear()
        .domain([0, 100])  // Assuming max percentage is 100%
        .range([height, 0]);

    let xScale = d3.scaleBand()
        .domain(data.map(d => d.type))
        .range([0, width])
        .padding(0.2);  // Adds some padding between bars

    barsvg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.type))
        .attr("width", xScale.bandwidth())
        .attr("y", d => yScale(d.percentage))
        .attr("height", d => height - yScale(d.percentage));

    barsvg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale).tickFormat(d => d + "%"));

    barsvg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("text-anchor", "middle");

    barsvg.append("text")
        .attr("x", width / 2)
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Type of Shelter");

    barsvg.selectAll(".percentage-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "percentage-label")
        .attr("x", d => xScale(d.type) + xScale.bandwidth() / 2) // Position at the center of the bar
        .attr("y", d => yScale(d.percentage) - 5) // 5 pixels above the top of the bar
        .attr("text-anchor", "middle")
        .text(d => d.percentage + "%");

}

