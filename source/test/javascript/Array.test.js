const assert = require("assert");
const suite = require("mocha").suite;
const test = require("mocha").test;

suite("Array", function()
{
    test("has a maximum capacity", function()
    {
        const capacity = Math.pow(2, 32) - 1;
        const array = new Array(capacity);

        assert.throws(() => array.push("a"));
    });
});
