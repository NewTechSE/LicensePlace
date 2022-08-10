/**
 * The promise should be rejected
 * @param promise The promise to test.
 * @param message The message to display if the assertion fails.
 */
export const assertRevert = (promise: Promise<any>, message?: string): void => {
    promise
        .then(() => assert.fail(message))
        .catch((error) => expect(error.toString()).to.contain("revert"));
};
