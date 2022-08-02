const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", accounts => { 
    it("should say hello", async () => {
        const helloWorld = await HelloWorld.new();
        const result = await helloWorld.sayHello();

        assert.equal(result, "Hello, World!");
    });
});