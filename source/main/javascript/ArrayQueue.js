const MAXIMUM_CAPACITY = Math.pow(2, 32) - 1;
const MINIMUM_CAPACITY = 0;

class ArrayQueue
{
    constructor()
    {
        if (isExternalConstructorCall)
            throw new PrivateConstructorError();
    }

    get capacity()
    {
        return instances.get(this).capacity;
    }

    get isEmpty()
    {
        return instances.get(this).isEmpty;
    }

    get isFull()
    {
        return instances.get(this).isFull;
    }

    get size()
    {
        return instances.get(this).size;
    }

    dequeue()
    {
        return instances.get(this).dequeue();
    }

    enqueue(item)
    {
        instances.get(this).enqueue(item);
    }

    peek()
    {
        return instances.get(this).peek();
    }

    static get MAXIMUM_CAPACITY()
    {
        return MAXIMUM_CAPACITY;
    }

    static create()
    {
        return construct(StandardArrayQueue);
    }

    static withCapacity(capacity)
    {
        if (!Number.isInteger(capacity))
            throw new InvalidCapacityError();
        if (capacity < MINIMUM_CAPACITY)
            throw new InvalidCapacityError();
        if (capacity > MAXIMUM_CAPACITY)
            throw new InvalidCapacityError();

        if (capacity === MINIMUM_CAPACITY)
            return EMPTY_QUEUE;

        return construct(StandardArrayQueue, capacity);
    }
}

class EmptyArrayQueue
{
    get capacity()
    {
        return MINIMUM_CAPACITY;
    }

    get isEmpty()
    {
        return true;
    }

    get isFull()
    {
        return true;
    }

    get size()
    {
        return MINIMUM_CAPACITY;
    }

    dequeue()
    {
        throw new EmptyQueueError();
    }

    enqueue(item)
    {
        throw new FullQueueError();
    }

    peek()
    {
        throw new EmptyQueueError();
    }
}

class StandardArrayQueue
{
    constructor(capacity = MAXIMUM_CAPACITY)
    {
        this.capacity = capacity;
        this.items = [];
    }

    get isEmpty()
    {
        return this.size === MINIMUM_CAPACITY;
    }

    get isFull()
    {
        return this.size === this.capacity;
    }

    get size()
    {
        return this.items.length;
    }

    dequeue()
    {
        if (this.isEmpty)
            throw new EmptyQueueError();

        return this.items.shift();
    }

    enqueue(item)
    {
        if (this.isFull)
            throw new FullQueueError();
        if (item === undefined)
            throw new UndefinedItemError();

        this.items.push(item);
    }

    peek()
    {
        if (this.isEmpty)
            throw new EmptyQueueError();

        return this.items[this.size - 1];
    }
}

class EmptyQueueError extends Error
{
    constructor()
    {
        super("queue is empty");
    }
}

class FullQueueError extends Error
{
    constructor()
    {
        super("queue is full");
    }
}

class InvalidCapacityError extends Error
{
    constructor()
    {
        super("invalid capacity");
    }
}

class PrivateConstructorError extends Error
{
    constructor()
    {
        super("constructor is private");
    }
}

class UndefinedItemError extends Error
{
    constructor()
    {
        super("item is undefined");
    }
}

let instances = new WeakMap();
let isExternalConstructorCall = true;

function construct(type, ...values)
{
    isExternalConstructorCall = false;

    const abstractQueue = new ArrayQueue();
    const concreteQueue = new type(...values);
    instances.set(abstractQueue, concreteQueue);

    isExternalConstructorCall = true;

    return abstractQueue;
}

const EMPTY_QUEUE = construct(EmptyArrayQueue);

module.exports = ArrayQueue;
