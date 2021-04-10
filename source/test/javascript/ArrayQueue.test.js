const assert = require("assert");
const setup = require("mocha").setup;
const suite = require("mocha").suite;
const test = require("mocha").test;
const ArrayQueue = require("../../main/javascript/ArrayQueue");

suite("ArrayQueue :: Creation", function()
{
    test("can be created with maximum capacity", function()
    {
        const queue = ArrayQueue.create();

        assert.strictEqual(queue instanceof ArrayQueue, true);
        assert.strictEqual(queue.capacity !== undefined, true);
        assert.strictEqual(queue.capacity, ArrayQueue.MAXIMUM_CAPACITY);
        assert.strictEqual(queue.size, 0);
    });

    test("can be created with positive capacity", function()
    {
        const queue = ArrayQueue.withCapacity(7);

        assert.strictEqual(queue instanceof ArrayQueue, true);
        assert.strictEqual(queue.capacity, 7);
        assert.strictEqual(queue.size, 0);
    });

    test("can be created with zero capacity", function()
    {
        const queue = ArrayQueue.withCapacity(0);

        assert.strictEqual(queue instanceof ArrayQueue, true);
        assert.strictEqual(queue.capacity, 0);
        assert.strictEqual(queue.size, 0);
    });

    test("cannot be created with undefined capacity", function()
    {
        assert.throws(() => ArrayQueue.withCapacity(undefined));
        assert.throws(() => ArrayQueue.withCapacity());
    });

    test("cannot be created with non-integer capacity", function()
    {
        assert.throws(() => ArrayQueue.withCapacity(1.7));
    });

    test("cannot be created with negative capacity", function()
    {
        assert.throws(() => ArrayQueue.withCapacity(-1));
    });

    test("cannot be created with capacity > maximum", function()
    {
        assert.throws(() => ArrayQueue.withCapacity(ArrayQueue.MAXIMUM_CAPACITY + 1));
    });

    test("cannot be created with constructor", function()
    {
        assert.throws(() => new ArrayQueue());
    });
});

suite("ArrayQueue", function()
{
    let queue = null;

    setup(function()
    {
        queue = ArrayQueue.withCapacity(3);
    });

    test("has first-in first-out ordering", function()
    {
        queue.enqueue("a");
        queue.enqueue("b");
        queue.enqueue("c");

        assert.strictEqual(queue.dequeue(), "a");
        assert.strictEqual(queue.dequeue(), "b");
        assert.strictEqual(queue.dequeue(), "c");
    });

    test("grows in size by one with each enqueue", function()
    {
        const initialSize = queue.size;
        queue.enqueue("a");

        assert.strictEqual(queue.size, initialSize + 1);
    });

    test("shrinks in size by one with each dequeue", function()
    {
        queue.enqueue("a");
        const initialSize = queue.size;

        queue.dequeue();

        assert.strictEqual(queue.size, initialSize - 1);
    });

    test("cannot enqueue undefined", function()
    {
        assert.throws(() => queue.enqueue(undefined));
        assert.throws(() => queue.enqueue());
    });

    test("cannot enqueue when full", function()
    {
        queue.enqueue("a");
        queue.enqueue("b");
        queue.enqueue("c");

        assert.throws(() => queue.enqueue("d"));
    });

    test("cannot dequeue when empty", function()
    {
        queue.enqueue("a");
        queue.enqueue("b");
        queue.enqueue("c");
        queue.dequeue();
        queue.dequeue();
        queue.dequeue();

        assert.throws(() => queue.dequeue());
    });
});

suite("ArrayQueue :: Zero Capacity", function()
{
    let queue = null;

    setup(function()
    {
        queue = ArrayQueue.withCapacity(0);
    });

    test("cannot enqueue", function()
    {
        assert.throws(() => queue.enqueue("a"));
    });

    test("cannot dequeue", function()
    {
        assert.throws(() => queue.dequeue());
    });
});
