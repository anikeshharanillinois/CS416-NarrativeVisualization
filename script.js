// script.js

d3.select(`#intro`).call(drawIntro);

/**document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.chart-section');
    let currentSection = 0;

    function updateNavigation() {
        sections.forEach((section, index) => {
            section.classList.toggle('active', index === currentSection);
            d3.select(`#${id}`).call(sectionDrawFunctions[index], filteredData);
        });

        document.getElementById('prev-button').disabled = currentSection === 0;
        document.getElementById('next-button').disabled = currentSection === sections.length - 1;
    }

    document.getElementById('prev-button').addEventListener('click', function () {
        if (currentSection > 0) {
            currentSection--;
            updateNavigation();
        }
    });

    document.getElementById('next-button').addEventListener('click', function () {
        console.log('next')
        console.log(currentSection)
        if (currentSection < sections.length - 1) {
            currentSection++;
            updateNavigation();
        }
    });

    updateNavigation();

    // Load the data
    d3.csv('owid-covid-data.csv').then(data => {
        // Parse the data
        const filteredData = data.filter(d => d.continent && d.continent.trim() !== '');

        filteredData.forEach(d => {
            d.date = new Date(d.date);
            d.iso_code = d.iso_code;
            d.continent = d.continent;
            d.location = d.location;
            d.total_cases = +d.total_cases;
            d.new_cases = +d.new_cases;
            d.new_deaths = +d.new_deaths;
            d.total_vaccinations = +d.total_vaccinations;
            d.new_vaccinations = +d.new_vaccinations;
            d.people_vaccinated = +d.people_vaccinated;
            d.people_fully_vaccinated = +d.people_fully_vaccinated;
        });

        const sectionDrawFunctions = {
            //'intro': drawIntro,
            'covid19overview': covid19overview,
            'detail2': drawDetail2,
            'drawVaccinationProgress': drawVaccinationProgress,
            'vaccination_fact': drawVaccinationFact,
            'drawSummaryAndInsightsHeader': drawSummaryAndInsightsHeader,
            'card-container': drawSummaryAndInsights,
            'explore': drawExplore
        };
    });
});**/

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.chart-section');
    const tabs = document.querySelectorAll('.tab');
    let currentSection = 0;
    let covidData = null;

    function updateNavigation() {
        // Clear the content of all sections
        // Update tab active state
        tabs.forEach((tab, i) => {
            if (i === currentSection) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        tabs.forEach((tab, i) => {
            if (i === currentSection) {
                tab.style.backgroundColor = 'orange'; // Active tab color
                tab.style.borderBottom = '2px solid #000'; // Active tab bottom border
            } else {
                tab.style.backgroundColor = '#f9f9f9'; // Inactive tab color
                tab.style.borderBottom = '2px solid #000'; // Inactive tab bottom border
            }
        });

        sections.forEach(section => {
            while (section.firstChild) {
                section.removeChild(section.firstChild);
            }
        });

        // Show the current section
        sections.forEach((section, index) => {
            section.classList.toggle('active', index === currentSection);
        });

        // Disable buttons if at the start or end
        document.getElementById('prev-button').disabled = currentSection === 0;
        document.getElementById('next-button').disabled = currentSection === sections.length - 1;

        // Call the draw function for the current section
        const sectionDrawFunctions = {
            'covid19overview': covid19overview,
            'detail2': drawDetail2,
            'drawVaccinationProgress': drawVaccinationProgress,
            'vaccination_fact': drawVaccinationFact,
            'card-container': drawSummaryAndInsights,
            'explore-user': drawExplore
        };

        const currentSectionId = sections[currentSection].id;
        console.log(currentSectionId)
        if (sectionDrawFunctions[currentSectionId]) {
            d3.select(`#${currentSectionId}`).call(sectionDrawFunctions[currentSectionId], covidData);
        }
    }

    document.getElementById('prev-button').addEventListener('click', function () {
        if (currentSection > 0) {
            currentSection--;
            updateNavigation();
        }
    });

    document.getElementById('next-button').addEventListener('click', function () {
        console.log(sections.length)
        console.log(currentSection)
        if (currentSection < sections.length - 1) {
            currentSection++;
            updateNavigation();
        }
    });

    d3.csv('owid-covid-data.csv').then(data => {
        console.log("loading data every time")
        // Parse the data
        covidData = data.filter(d => d.continent && d.continent.trim() !== '');
        
        covidData.forEach(d => {
            d.date = new Date(d.date);
            d.iso_code = d.iso_code;
            d.continent = d.continent;
            d.location = d.location;
            d.total_cases = +d.total_cases;
            d.new_cases = +d.new_cases;
            d.new_deaths = +d.new_deaths;
            d.total_vaccinations = +d.total_vaccinations;
            d.new_vaccinations = +d.new_vaccinations;
            d.people_vaccinated = +d.people_vaccinated;
            d.people_fully_vaccinated = +d.people_fully_vaccinated;
        });
        updateNavigation();
    });
});

// Load the data
/**d3.csv('owid-covid-data.csv').then(data => {
    // Parse the data
    // Exclude records with iso_code equal to ''
    const filteredData = data.filter(d => d.continent && d.continent.trim() !== '');

    filteredData.forEach(d => {
        d.date = new Date(d.date);
        d.iso_code = d.iso_code;
        d.continent = d.continent;
        d.location = d.location;
        d.total_cases = d.total_cases;
        d.new_cases = d.new_cases;
        d.new_deaths = d.new_deaths;
        d.total_vaccinations = d.total_vaccinations;
        d.new_vaccinations = d.new_vaccinations;
        d.people_vaccinated = d.people_vaccinated;
        d.people_fully_vaccinated = d.people_fully_vaccinated;

        // Continue parsing other fields as necessary
    });

    // Set up the narrative sections
    const sections = [
        { id: 'intro', draw: drawIntro },
        { id: 'covid19overview', draw: covid19overview},
        { id: 'detail2', draw: drawDetail2 },
        { id: 'drawVaccinationProgress', draw:drawVaccinationProgress },
        { id: 'vaccination_fact', draw:drawVaccinationFact },
        { id: 'drawSummaryAndInsightsHeader', draw:drawSummaryAndInsightsHeader},
        { id: 'card-container', draw:drawSummaryAndInsights },
        { id: 'explore', draw: drawExplore }
    ];

    sections.forEach(section => {
        d3.select(`#${section.id}`).call(section.draw, filteredData);
    });
});**/

function drawIntro(selection) {
    selection.append('h1').text('COVID-19');
    selection.append('h3').text('CS416 - Narrative Visualization');
    selection.append('h3').text('Anikesh Haran [anikesh2@illinois.edu]');
    selection.append('h3').text('About this data');
    selection.append('p').attr('class', 'boxed').html('This dataset is curated by "Our World in Data" and includes COVID-19 data updated daily during the pandemic. The original dataset can be found at - <strong>https://github.com/owid/covid-19-data/blob/master/public/data/owid-covid-data.csv</strong>');
    // Add more detailed visualizations for the introduction
}

//covid-19 overview
function covid19overview(selection, data) {
    // Set the dimensions and margins of the map
    const width = 960;
    const height = 600;

    // Append the svg object to the selection
    selection.append('h2').text('COVID-19 - Global Overview - Cases & Deaths');
    selection.append("div")
    const svg = selection.append("svg")
        .attr("width", width)
        .attr("height", height);

    // Map and projection
    const projection = d3.geoNaturalEarth1()
        .scale(160)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Create a map to store the data
    const dataMap = new Map();
    data.forEach(d => {
        if (!dataMap.has(d.iso_code)) {
            dataMap.set(d.iso_code, {
                total_cases: 0,
                total_deaths: 0
            });
        }
        const entry = dataMap.get(d.iso_code);
        entry.total_cases += +d.new_cases;
        entry.total_deaths += +d.new_deaths;
    });

    // Color scale for the map
    /*const colorScale = d3.scaleSequential(d3.interpolateReds)
        .domain([0, d3.max(data, d => d.total_cases)]);*/

    // Define a color array with 30 distinct colors by combining different D3 schemes
    // Define a color array with 30 distinct colors by combining different D3 schemes
    const colors = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", // schemeCategory10
        "#393b79", "#637939", "#8c6d31", "#843c39", "#7b4173", "#a55194", "#6b6ecf", "#d6616b", "#ce6dbd", "#de9ed6", // schemePaired
        "#9c9ede", "#ff9896", "#c5b0d5", "#c49c94", "#f7b6d2", "#dbdb8d", "#c7c7c7", "#9edae5", "#17becf", "#bcbd22"  // schemeSet3
    ];

    // Create a threshold scale with the defined colors
    const colorScale = d3.scaleThreshold()
        .domain(d3.range(30).map(d => d * (100000000 / 30)))  // 29 thresholds for 30 colors
        .range(colors);
    

    // Load the GeoJSON data and draw the map
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(geoData) {
        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .join("path")
            .attr("d", path)
            .attr("fill", function(d) {
                const iso_code = d.id;
                const countryData = dataMap.get(iso_code);
                d.total_cases = countryData ? countryData.total_cases : 0;
                return colorScale(d.total_cases);
            })
            .append("title")
            .text(d => {
                const countryData = dataMap.get(d.id);
                return countryData
                    ? `${d.properties.name}\nTotal cases: ${countryData.total_cases}\nTotal deaths: ${countryData.total_deaths}`
                    : `${d.properties.name}\nNo data available`;
            });

        // Add tooltip
        const tooltip = d3.select(".tooltip")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "#fff")
            .style("border", "1px solid #ccc")
            .style("padding", "10px")
            .style("border-radius", "5px")
            .style("pointer-events", "none");

        //const tooltip = selection.append("div")
        //  .attr("class", "tooltip");

        svg.selectAll("path")
            .on("mouseover", function(event, d) {
                tooltip.style("opacity", 1);
            })
            .on("mousemove", function(event, d) {
                const countryData = dataMap.get(d.id);
                tooltip.html(countryData
                    ? `<strong>${d.properties.name}</strong><br>Total cases: ${countryData.total_cases}<br>Total deaths: ${countryData.total_deaths}`
                    : `<strong>${d.properties.name}</strong><br>No data available`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 10) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });
    });
}

/**function drawDetail2(selection, data) {
    selection.append('h2').text('New Cases Over Time');
    // Add visualization for new cases
    const width = 960;
    const height = 600;
    const svg = selection.append('svg')
        .attr('width', width)
        .attr('height', height);

    data.forEach(d => {
        d.date = new Date(d.date);
        d.new_cases = +d.new_cases;
    });

    const x = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([0, 600]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.new_cases)]).range([400, 0]);

    svg.append('g').call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));

    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', d3.line()
            .x(d => x(d.date))
            .y(d => y(d.new_cases))
        );
}**/

function drawDetail2(selection, data) {
    // Add a heading
    selection.append('h2').text('New Cases Over Time');
    selection.append("div");

    // Define dimensions and margins
    const margin = { top: 80, right: 80, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    //const width = 960;
    //const height = 600;

    // Append SVG object to the selection
    const svg = selection.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse the date and format the data
    data.forEach(d => {
        d.date = new Date(d.date);
        d.new_cases = +d.new_cases;
    });

    // Define scales
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.new_cases)])
        .range([height, 0]);

    // Add the x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append('g')
        .call(d3.axisLeft(y));

    // Define the line
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.new_cases));

    // Add the line to the SVG
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 1.5)
        .attr('d', line);

    // Add tooltip div
    const tooltip = d3.select(".tooltip2")
        .attr('class', 'tooltip2')
        .style('position', 'absolute')
        .style('background', '#fff')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    // Add circles for tooltip interaction
    svg.selectAll('dot')
        .data(data)
        .enter().append('circle')
        .attr('r', 5)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.new_cases))
        .style('fill', 'orange')
        .on('mouseover', function (event, d) {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`Date: ${d.date.toLocaleDateString()}<br>New Cases: ${d.new_cases}`)
                .style('left', (event.pageX + 5) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function () {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });

    // Function to get quarter from a date
    function getQuarter(date) {
        const month = date.getMonth();
        if (month < 3) return 1;
        if (month < 6) return 2;
        if (month < 9) return 3;
        return 4;
    }

    // Group data by year and quarter
    const dataByQuarter = d3.group(data, d => d.date.getFullYear(), d => getQuarter(d.date));

    // Find peak for each quarter
    const peaks = [];
    dataByQuarter.forEach((yearGroup) => {
        yearGroup.forEach((quarterGroup) => {
            const peak = d3.max(quarterGroup, d => d.new_cases);
            const peakData = quarterGroup.find(d => d.new_cases === peak);
            if(peak > 5007618){
                peaks.push(peakData);
            }
        });
    });

    // Add annotations for the peaks
    /**peaks.forEach(peak => {
        svg.append('text')
            .attr('x', x(peak.date))
            .attr('y', y(peak.new_cases) - 10)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .style('font-size', '12px')
            .text(`Peak: ${peak.new_cases}`);

        svg.append('line')
            .attr('x1', x(peak.date))
            .attr('x2', x(peak.date))
            .attr('y1', y(peak.new_cases))
            .attr('y2', y(peak.new_cases) - 10)
            .attr('stroke', 'black')
            .attr('stroke-width', 1);
    });**/

    // Add annotations for the peaks
    peaks.forEach(peak => {
        const annotationGroup = svg.append('g')
            .attr('transform', `translate(${x(peak.date)},${y(peak.new_cases) - 15})`);

        annotationGroup.append('rect')
            .attr('x', -150)
            .attr('y', -40)
            .attr('width', 100)
            .attr('height', 40)
            .attr('fill', 'white')
            .attr('stroke', 'black');

        annotationGroup.append('text')
            .attr('x', -100)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .style('font-size', '12px')
            .text(`Date: ${peak.date.toLocaleDateString()}`);

        annotationGroup.append('text')
            .attr('x', -100)
            .attr('y', -5)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .style('font-size', '12px')
            .text(`Peak: ${peak.new_cases}`);

        svg.append('line')
            .attr('x1', x(peak.date))
            .attr('x2', x(peak.date)-50)
            .attr('y1', y(peak.new_cases))
            .attr('y2', y(peak.new_cases) - 15)
            .attr('stroke', 'black')
            .attr('stroke-width', 1);
    });
}

function drawVaccinationProgress(selection, data) {
    // Add a heading
    selection.append('h2').text('Vaccination Progress');

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Append SVG object to the selection
    const svg = selection.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse the date and format the data
    data.forEach(d => {
        d.date = new Date(d.date);
        d.new_vaccinations = +d.new_vaccinations;
    });

    // Define scales
    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.new_vaccinations)])
        .range([height, 0]);

    // Add the x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Add the y-axis for new vaccinations on the left side
    svg.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', 'black')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('dy', '1em')
        .attr('text-anchor', 'end')
        .text('New Vaccinations');

    // Define the line for new vaccinations
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.new_vaccinations));

    // Add the line to the SVG
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('d', line);

    // Add a tooltip div
    const tooltip = selection.append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', '#fff')
        .style('padding', '5px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('pointer-events', 'none')
        .style('opacity', 0);

    // Add circles for tooltip interaction
    svg.selectAll('dot')
        .data(data)
        .enter().append('circle')
        .attr('r', 3)
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.new_vaccinations))
        .attr('fill', 'blue')
        .on('mouseover', (event, d) => {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`Date: ${d3.timeFormat('%Y-%m-%d')(d.date)}<br/>New Vaccinations: ${d.new_vaccinations}`)
                .style('left', (event.pageX + 5) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', () => {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });

    const startDate = d3.min(data.filter(d => d.new_vaccinations > 0), d => d.date);

    // Add a vertical line at the start of vaccinations
    svg.append('line')
        .attr('x1', x(startDate))
        .attr('x2', x(startDate))
        .attr('y1', 65)
        .attr('y2', height)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)

    // Add a legend for the vaccination start
    svg.append('text')
        .attr('x', x(startDate))
        .attr('y', 65)
        .attr('text-anchor', 'middle')
        .attr('fill', 'orange')
        .text('Vaccination Started')
        .style("font-weight", "bold");

    // Add a legend box for better visibility
    svg.append('rect')
        .attr('x', x(startDate) - 75)
        .attr('y', 50)
        .attr('width', 150)
        .attr('height', 20)
        .attr('fill', 'none')
        .attr('opacity', 0.75)
        .attr('stroke', 'orange')
        .attr('stroke-width', 2);
}

function drawVaccinationFact(selection, data){
    selection.append('div')
        .attr('class', 'info-box')
        .style('margin', '20px auto')
        .style('padding', '10px')
        .style('border', '1px solid #ccc')
        .style('border-radius', '5px')
        .style('background', '#f9f9f9')
        .style('max-width', '960px')
        .style('text-align', 'center')
        .html(`
            <h4>Vaccination Facts</h4>
            <p><strong>It is a fact that subsequent waves of COVID-19 occurred even after the commencement of vaccination programs.</strong></p>
            <p>Despite the rollout of vaccines, several factors contributed to the emergence of additional waves:</p>
            <ul style="text-align: left; margin: 0 auto; display: inline-block; text-align: left;">
                <li><strong>Variants:</strong> New variants of the virus, such as Delta and Omicron, emerged and spread rapidly. Some of these variants had higher transmissibility and partially evaded immunity from previous infections or vaccinations.</li>
                <li><strong>Vaccine Coverage:</strong> Initial vaccine coverage was not uniform across regions, and many populations were not fully vaccinated, leaving gaps in immunity.</li>
                <li><strong>Behavioral Factors:</strong> Changes in public behavior, such as the relaxation of social distancing measures, travel, and the resumption of large gatherings, contributed to the spread of the virus.</li>
                <li><strong>Vaccine Efficacy:</strong> While vaccines were highly effective at preventing severe disease and death, their effectiveness at preventing infection and transmission varied, especially with emerging variants.</li>
            </ul>
        `);
}

function getTotalPeopleVaccinated(data){
    // Step 1: Group data by iso_code and calculate max people_fully_vaccinated
    var groupedData = data.reduce(function(acc, current) 
    {
        var isoCode = current.iso_code;
        var vaccinated = current.people_vaccinated;
        // Check if iso_code exists in accumulator
        if (!acc[isoCode]) {
            acc[isoCode] = vaccinated;
        } else {
            // Update to the maximum value
            acc[isoCode] = Math.max(acc[isoCode], vaccinated);
        }
        return acc;
    }, {});

    // Step 2: Calculate the sum of max values
    var sumFullyVaccinated = Object.values(groupedData).reduce(function(acc, current) {
      return acc + current;
    }, 0);
    return sumFullyVaccinated
}

function getTotalPeopleFullyVaccinated(data){
    // Step 1: Group data by iso_code and calculate max people_fully_vaccinated
    var groupedData = data.reduce(function(acc, current) 
    {
        var isoCode = current.iso_code;
        var vaccinated = current.people_fully_vaccinated;

        // Check if iso_code exists in accumulator
        if (!acc[isoCode]) {
            acc[isoCode] = vaccinated;
        } else {
            // Update to the maximum value
            acc[isoCode] = Math.max(acc[isoCode], vaccinated);
        }
        return acc;
    }, {});

    // Step 2: Calculate the sum of max values
    var sumFullyVaccinated = Object.values(groupedData).reduce(function(acc, current) {
      return acc + current;
    }, 0);
    return sumFullyVaccinated
}

/*function drawSummaryAndInsightsHeader(selection, data) {
    // Add a heading
    selection.append('h2').text('Summary and Insights');
}*/

function drawSummaryAndInsights(selection, data) {
    //d3.select("#summaryAndInsightsHeader").append('h2').text('Summary and Insights');
    // Add a heading
    selection.append('h2').text('Summary and Insights');

    // Aggregate the global data
    let globalData = {
        total_cases: 0,
        new_cases: 0,
        total_deaths: 0,
        new_deaths: 0,
        total_vaccinations: 0,
        people_vaccinated: 0,
        people_fully_vaccinated: 0,
        total_boosters: 0,
        icu_patients: 0,
        icu_patients_per_million: 0,
        hosp_patients: 0,
        hosp_patients_per_million: 0,
        population: 0
    };

    data.forEach(d => {
        d.date = new Date(d.date);
        d.total_cases = +d.total_cases || 0;
        d.new_cases = +d.new_cases || 0;
        d.total_deaths = +d.total_deaths || 0;
        d.new_deaths = +d.new_deaths || 0;
        d.new_vaccinations = +d.new_vaccinations || 0;
        d.people_vaccinated = +d.people_vaccinated || 0;
        d.people_fully_vaccinated = +d.people_fully_vaccinated || 0;
        d.total_boosters = +d.total_boosters || 0;
        d.icu_patients = +d.icu_patients || 0;
        d.icu_patients_per_million = +d.icu_patients_per_million || 0;
        d.hosp_patients = +d.hosp_patients || 0;
        d.hosp_patients_per_million = +d.hosp_patients_per_million || 0;
        d.population = +d.population || 0;

        globalData.total_cases += d.total_cases;
        globalData.new_cases += d.new_cases;
        globalData.total_deaths += d.total_deaths;
        globalData.new_deaths += d.new_deaths;
        //console.log(d.new_deaths);
        //console.log(globalData.new_deaths);
        globalData.total_vaccinations = d.new_vaccinations + globalData.total_vaccinations;
        //globalData.people_vaccinated += d.people_vaccinated;
        //globalData.people_fully_vaccinated += d.people_fully_vaccinated;
        globalData.total_boosters += d.total_boosters;
        globalData.icu_patients += d.icu_patients;
        globalData.icu_patients_per_million += d.icu_patients_per_million;
        globalData.hosp_patients += d.hosp_patients;
        globalData.hosp_patients_per_million += d.hosp_patients_per_million;
        globalData.population += d.population;
    });

    // Sort data by date to get the latest data point
    //data.sort((a, b) => b.date - a.date);
    const latestData = data[data.length - 1]; 

    total_people_vaccinated = getTotalPeopleVaccinated(data)
    total_people_fully_vaccinated = getTotalPeopleFullyVaccinated(data)

    // Total global population
    const totalPopulation = 8000000000;

    // Calculate the percentage of vaccinated population
    const percentageVaccinated = (total_people_vaccinated / totalPopulation) * 100;
    // Calculate the percentage of vaccinated population
    const percentageVaccinatedFully = (total_people_fully_vaccinated / totalPopulation) * 100;

    const caseFatalityRate = ((globalData.new_deaths / globalData.new_cases) * 100).toFixed(2);

    // Sample data
    const datas = [
        { title: "Total Cases", content: globalData.new_cases.toLocaleString()},
        { title: "Total Deaths", content: globalData.new_deaths.toLocaleString()},
        { title: "Total Vaccinations", content: globalData.total_vaccinations.toLocaleString()},
        { title: "Total People Vaccinated", content: total_people_vaccinated.toLocaleString()},
        { title: "Total People Vaccinated[%]", content: percentageVaccinated.toFixed(2).toLocaleString()+"%" },
        { title: "Total People Fully Vaccinated:", content: total_people_fully_vaccinated.toLocaleString() },
        { title: "Total People Fully Vaccinated[%]", content: percentageVaccinatedFully.toFixed(2)+"%"}
        /***{ title: "Total ICU Patients", content: globalData.icu_patients.toLocaleString()},
        { title: "ICU Patients per Million", content: globalData.icu_patients_per_million.toLocaleString()},
        { title: "Total Hospital Patients", content: globalData.hosp_patients.toLocaleString()},
        { title: "Hospital Patients per Million", content: globalData.hosp_patients_per_million.toLocaleString()},
        { title: "Case Fatality Rate (CFR)", content: caseFatalityRate}***/
    ];

    // Select the container
    //const container = d3.select("#card-container1");
    const container = selection.append("div").attr("id", "card-container1");
    // Select #main-container and apply styles
    d3.select('#main-container')
        .style('width', '100%')
        .style('max-width', '960px')
        .style('padding', '20px')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .style('background-color', 'white');

    // Select #card-container and apply styles
    container.style('display', 'grid')
        .style('grid-template-columns', 'repeat(auto-fill, minmax(200px, 1fr))')
        .style('gap', '20px')
        .style('padding', '20px')
        .style('background-color', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '5px')
        .style('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.1)')
        .style('width', '100%')
        .style('max-width', '960px');

    // Select .card and apply styles

    // Select .card h3 and apply styles
    d3.selectAll('.card h3')
        .style('margin-top', '0');

    // Select .card p and apply styles
    d3.selectAll('.card p')
        .style('margin', '0')
        .style('padding-top', '10px');
    // Bind data and create cards


    container.selectAll(".card")
        .data(datas)
        .enter()
        .append("div")
        .attr("class", "card")
        .html(d => `<h3>${d.title}</h3><p>${d.content}</p>`)
        .style('background-color', '#f9f9f9')
        .style('border', '2px solid #ddd')
        .style('border-radius', '5px')
        .style('box-shadow', '0 2px 5px rgba(0, 0, 0, 0.1)')
        .style('padding', '20px')
        .style('text-align', 'center');

}

/**function drawExplore(selection, data) {
    d3.select("#title_explore").append('h2').text('Explore the Data');

    // Intersection Observer setup to load the graph when the user scrolls to it
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.5 // Trigger when 10% of the target is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load and visualize data when the target element is visible
                loadDataAndVisualize(data);
                // Stop observing once the graph is loaded
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(document.getElementById('visualization'));
}**/

/**function drawExplore(selection, data) {
    console.log("inside draw explore")
    selection.append("div").attr("id", "title_explore").append('h2').text('Explore the Data');
}*/

function drawExplore(selection, data) {
    selection.append("div").attr("id", "title_explore").append('h2').text('Explore Vaccination Progress');
    //d3.select("#title_explore").append('h2').text('Explore the Data');

    // Extract unique values for countries
    const countries = Array.from(new Set(data.map(d => d.location)));

    // Create and populate country select
    //const controlsDiv = d3.select("#controls");
    const controlsDiv = selection.append("div").attr("id", "controls");

    // Add field name
    controlsDiv.append("label")
        .attr("for", "country-select")
        .text("Country");

    // Create country select dropdown
    const countrySelect = controlsDiv.append("select")
        .attr("id", "country-select");

    countrySelect.selectAll("option")
        .data(["All"].concat(countries))
        .enter()
        .append("option")
        .text(d => d);

    // Variables for SVG dimensions and margins
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Append SVG to #visualization div
    //const svg = d3.select("#visualization")
    const svg = selection.append("div").attr("id", "visualization")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create scales for the line graph
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // Create line generator
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.new_vaccinations));

    // Create axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Append x-axis to the SVG
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .text('Date');

    // Append y-axis to the SVG
    svg.append("g")
        .attr("class", "y axis")
        .text('New Vaccinations');

    // Append tooltip to the visualization
    const tooltip = d3.select("#visualization")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append legend to the SVG
    const legend = svg.append("g")
        .attr("class", "legend")
        .style("display", "none");

    legend.append("rect")
        .attr("x", width - 150)
        .attr("y", 10)
        .attr("width", 140)
        .attr("height", 50)
        .attr("fill", "white")
        .attr("stroke", "black");

    legend.append("text")
        .attr("class", "legend-date")
        .attr("x", width - 140)
        .attr("y", 30)
        .attr("dy", ".35em");

    legend.append("text")
        .attr("class", "legend-value")
        .attr("x", width - 140)
        .attr("y", 50)
        .attr("dy", ".35em");

    // Function to update data and the graph based on user selection
    function updateData() {
        const selectedCountry = d3.select("#country-select").property("value");

        const filteredData = data.filter(d => selectedCountry === "All" || d.location === selectedCountry);

        // Update the scales
        x.domain(d3.extent(filteredData, d => d.date));
        y.domain([0, d3.max(filteredData, d => d.new_vaccinations)]);

        // Update the line path
        const path = svg.selectAll(".line")
            .data([filteredData]);

        path.enter()
            .append("path")
            .attr("class", "line")
            .merge(path)
            .transition()
            .duration(2500)
            .attr("d", line)
            .attr('fill', 'none')
            .attr('stroke', 'orange')
            .attr('stroke-width', 1);

        // Create bisector to find the closest data point
        const bisector = d3.bisector(d => d.date).left;

        // Add tooltip events
        path.on("mouseover", function (event, d) {
            const mouseX = d3.pointer(event)[0];
            const index = bisector(filteredData, x.invert(mouseX));
            const closestDataPoint = filteredData[index];

            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(`<br>Date: ${d3.timeFormat("%Y-%m-%d")(closestDataPoint.date)}<br>New Vaccinations: ${closestDataPoint.new_vaccinations}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

        // Update axes
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
    }

    // Event listener for country select change
    d3.select("#country-select").on("change", updateData);

    // Initial update of data
    updateData();

    // Add brushing functionality
    const brush = d3.brushX()
        .extent([[0, 0], [width, height]])
        .on("end", brushed);

    svg.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushed(event) {
        if (!event.selection) return;
        const [x0, x1] = event.selection.map(x.invert);
        const selectedCountry = d3.select("#country-select").property("value");
        var filteredData = data.filter(d => selectedCountry === "All" || d.location === selectedCountry);
        filteredData = filteredData.filter(d => d.date >= x0 && d.date <= x1);

        x.domain([x0, x1]);
        svg.select(".x.axis").call(xAxis);

        const path = svg.selectAll(".line")
            .data([filteredData]);

        path.enter()
            .append("path")
            .attr("class", "line")
            .merge(path)
            .attr("d", line)
            .attr('fill', 'none')
            .attr('stroke', 'orange')
            .attr('stroke-width', 1);

        svg.select(".brush").call(brush.move, null); // Clear the brush after zoom
    }
}

/**function drawExplore2(selection, data) {
    d3.select("#title_explore").append('h2').text('Explore the Data');
    // Parse the date and format the data
    //data.forEach(d => {
    //    d.date = new Date(d.date);
    //   d.new_vaccinations = +d.new_vaccinations;
    //});

    // Extract unique values for countries
    var countries = Array.from(new Set(data.map(d => d.location)));

    // Create and populate country select
    var controlsDiv = d3.select("#controls");

    // Add field name
    controlsDiv.append("label")
        .attr("for", "country-select")
        .text("Country");

    // Create country select dropdown
    var countrySelect = controlsDiv.append("select")
        .attr("id", "country-select");

    const a = countrySelect.selectAll("option")
        .data(["All"].concat(countries))
        .enter()
        .append("option")
        .text(d => d);

    // Variables for SVG dimensions and margins
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Append SVG to #visualization div
    var svg = d3.select("#visualization")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create scales for the line graph
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Create line generator
    var line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.new_vaccinations));

    // Create axes
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    // Append x-axis to the SVG
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .text('Date');

    // Append y-axis to the SVG
    svg.append("g")
        .attr("class", "y axis")
        .text('New Vaccinations');

    // Append tooltip to the visualization
    var tooltip = d3.select("#visualization")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append legend to the SVG
    var legend = svg.append("g")
        .attr("class", "legend")
        .style("display", "none");

    legend.append("rect")
        .attr("x", width - 150)
        .attr("y", 10)
        .attr("width", 140)
        .attr("height", 50)
        .attr("fill", "white")
        .attr("stroke", "black");

    legend.append("text")
        .attr("class", "legend-date")
        .attr("x", width - 140)
        .attr("y", 30)
        .attr("dy", ".35em");

    legend.append("text")
        .attr("class", "legend-value")
        .attr("x", width - 140)
        .attr("y", 50)
        .attr("dy", ".35em");

    // Function to update data and the graph based on user selection
    function updateData() {
        var selectedCountry = d3.select("#country-select").property("value");

        var filteredData = data.filter(d => selectedCountry === "All" || d.location === selectedCountry);

        // Update the scales
        x.domain(d3.extent(filteredData, d => d.date));
        y.domain([0, d3.max(filteredData, d => d.new_vaccinations)]);

        // Update the line path
        var path = svg.selectAll(".line")
            .data([filteredData]);

        path.enter()
            .append("path")
            .attr("class", "line")
            .merge(path)
            .transition()
            .duration(2500)
            .attr("d", line)
            .attr('fill', 'none')
            .attr('stroke', 'orange')
            .attr('stroke-width', 1);

        // Create bisector to find the closest data point
        var bisector = d3.bisector(function(d) { return d.date; }).left;

        // Add tooltip events
        path.on("mouseover", function(event, d) {
            var mouseX = d3.pointer(event)[0];
            var index = bisector(filteredData, x.invert(mouseX));
            var closestDataPoint = filteredData[index];

            //legend.style("display", null);
            //legend.select(".legend-date").text(`Date: ${d3.timeFormat("%Y-%m-%d")(closestDataPoint.date)}`);
            //legend.select(".legend-value").text(`New Vaccinations: ${closestDataPoint.new_vaccinations}`);

            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(`<br>Date: ${d3.timeFormat("%Y-%m-%d")(closestDataPoint.date)}<br>New Vaccinations: ${closestDataPoint.new_vaccinations}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            legend.style("display", "none");

            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

        // Update axes
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
    }

    // Event listener for country select change
    d3.select("#country-select").on("change", function() {
        filteredData = updateData();
    });

    // Initial update of data
    updateData();
}**/
