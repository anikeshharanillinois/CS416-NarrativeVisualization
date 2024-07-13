// Sample data
const data = [
    { title: "Card 1", content: "This is card 1" },
    { title: "Card 2", content: "This is card 2" },
    { title: "Card 3", content: "This is card 3" },
    { title: "Card 4", content: "This is card 4" }
];

// Select the container
const container = d3.select("#card-container");

// Bind data and create cards
container.selectAll(".card")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "card")
    .html(d => `<h3>${d.title}</h3><p>${d.content}</p>`);
