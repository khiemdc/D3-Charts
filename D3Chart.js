// const container = d3.select('#container');
// const padding = 4;

const saleData = [
    {Year: '2010', Qty: 1000},
    {Year: '2011', Qty: 2330},
    {Year: '2012', Qty: 4540},
    {Year: '2013', Qty: 5550},
    {Year: '2014', Qty: 1230},
    {Year: '2015', Qty: 4349},
    {Year: '2016', Qty: 7039},
    {Year: '2017', Qty: 4034},
    {Year: '2018', Qty: 3035},
    {Year: '2019', Qty: 2043}
];

const svg = d3.select('#svg');
const padding = {top: 20, right: 30, bottom: 30, left: 50};
const colors=d3.schemeCategory20c;
const chartArea = {
    'width': parseInt(svg.style('width')) - padding.left-padding.right,
    'height': parseInt(svg.style('height')) - padding.top-padding.bottom
};

const yScale = d3.scaleLinear()
                .domain([0, d3.max(saleData, function (d,i) {return d.Qty })])
                .range([chartArea.height, 0]).nice();
const xScale = d3.scaleBand()
                .domain(saleData.map(function(d) {return d.Year}))
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

rectGrp.selectAll('rect').data(saleData)
                        .enter()
                        .append('rect')
                        .attr('width', xScale.bandwidth())
                        .attr('height', function(d,i) {
                            return chartArea.height-yScale(d.Qty);
                        })
                        .attr('x', function(d,i) {
                            return xScale(d.Year);
                        })
                        .attr('y', function(d,i) {
                            return yScale(d.Qty);
                        })
                        .attr('fill', function(d,i) {
                            return colors[i];
                        })

// const bar = container.append('div');
// bar.classed('bar', true)
//     .style('width', '60px')
//     .style('height', yScale(500)+'px');

// let svg = d3.select('#container')
//             .append('svg')
//             .attr('width', w)
//             .attr('height', h);

// svg.selectAll('rect')
//   .data(dataset)
//   .enter()
//     .append('rect')
//     .attrs({
//       x: (d, i) => i * (w / dataset.length),
//       y: d => h - d,
//       width: w / dataset.length - padding,
//       height: d => d,
//       fill: 'green'
// });

// svg.selectAll('text')
//   .data(dataset)
//   .enter()
//     .append('text')
//     .text((d) => d)
//     .attrs({
//       x: (d,i) => i * (w / dataset.length) + (w / dataset.length - padding) / 2,
//       y: (d) => h - d + 25
// });