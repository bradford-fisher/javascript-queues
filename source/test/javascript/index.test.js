const assert = require("assert");
const suite = require("mocha").suite;
const test = require("mocha").test;

suite("index", function()
{
    test("exports ArrayQueue", function()
    {
        const ArrayQueue = require("../../main/javascript/ArrayQueue");
        const Export = require("../../main/javascript").ArrayQueue;

        assert.strictEqual(Export, ArrayQueue);
    });
});
