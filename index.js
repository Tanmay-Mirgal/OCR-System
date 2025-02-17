const text = `FOAM

GARNIGR

=

COMPLETE

VitaminC

Face wash

TAMPAK BERSIH
CERAH SEKETIKA

ANTI BACTERIAL

For all akin types`;

const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");




const foundCategory = lines.find(line => categories.includes(line.toUpperCase()));

console.log(foundCategory || "Category not found");
