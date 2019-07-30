// const container = d3.select('#container');
// const padding = 4;

const data = [
    {Year: '2010', Person: 1000},
    {Year: '2011', Person: 2330},
    {Year: '2012', Person: 4540},
    {Year: '2013', Person: 5550},
    {Year: '2014', Person: 1230},
    {Year: '2015', Person: 4349},
    {Year: '2016', Person: 7039},
    {Year: '2017', Person: 4034},
    {Year: '2018', Person: 3035},
    {Year: '2019', Person: 2043}
];

const svg = d3.select('#svg');
const padding = {top: 20, right: 30, bottom: 30, left: 50};
const colors=d3.schemeCategory20c;
const chartArea = {
    'width': parseInt(svg.style('width')) - padding.left-padding.right,
    'height': parseInt(svg.style('height')) - padding.top-padding.bottom
};

const tooltip = d3.select("body").append('div').attr('class', 'toolTip');
const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, (d,i) => d.Person)])
                .range([chartArea.height, 0]).nice();
const xScale = d3.scaleBand()
                .domain(data.map( (d) => d.Year))
                .range([0,chartArea.width])
                .padding(.2);

// xAxis
const xAxis = svg.append('g')
                .classed('xAxis', true)
                .attr(
                    'transform', 'translate('+padding.left+','+(chartArea.height + padding.top)+')'
                )
                .call(d3.axisBottom(xScale));

//yAxis
const yAxisFn = d3.axisLeft(yScale);
const yAxis = svg.append('g')
                .classed('yAxis', true)
                .attr(
                    'transform', 'translate('+padding.left+', '+padding.top+')'
                )
                yAxisFn(yAxis);

const rectGrp = svg.append('g')
                    .attr(
                        'transform', 'translate('+padding.left+', '+padding.top+')'
                    );

rectGrp.selectAll('rect').data(data)
                        .enter()
                        .append('rect')
                        .attr('class', 'bar')
                        .attr('width', xScale.bandwidth())
                        .attr('height', (d,i) => chartArea.height-yScale(d.Person))
                        .attr('x', (d,i) => xScale(d.Year))
                        .attr('y', (d,i) => yScale(d.Person))
                        .attr('fill', (d,i) => colors[i])

                        
rectGrp.selectAll('rect').data(data)
                        .on('mousemove', function(d) {
                            tooltip
                            .style('left', d3.event.pageX - 50 + 'px')
                            .style('top', d3.event.pageY - 70 + 'px')
                            .style('display', 'inline-block')
                            .html((d.Year) + ': ' + (d.Person) + ' Prisoners');
                            })
                        .on('mouseout', function(d) { tooltip.style('display', 'none'); })
                        .on('click', d => {
                            console.log('clicked on: ', d);
                        });


// Display Text on each bar charts
                        rectGrp.selectAll('.text')
                        .data(data)
                        .enter()
                        .append('text')
                        .attr('class', 'text')
                        // .text(d => d.Candidates)
                        .attr('x', (a) => xScale(a.Year) + xScale.bandwidth() / 2)
                        .attr('y', (a) => yScale(a.Person) - 3)
                        .attr('text-anchor', 'middle')
                        .text((a) => `${a.Person}`)
