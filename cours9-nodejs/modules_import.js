// Importer le module module Calculator
var calculator = require("./module_calculator.js");
calculator.sum(10, 20);

// Importer le module Shapes
var Point = require("./module_shapes.js");
var p = new Point(1, 2);

// Importer le module Shapes
//var Point2 = require("./module_shapes2.js");
//var p = new Point2(1, 2);

// Importer le module Counter
var Counter = require("./module_counter.js");
var counter = Counter(5);
counter.increment();  counter.reset(); counter.increment();
