const polyfillCryto = () => {
    if (!('crypto' in global.self)) {
        Object.defineProperty(global.self, 'crypto', {
            value: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getRandomValues: (arr: any) => crypto.getRandomValues(arr.length)
            }
        });
    }
};

export default polyfillCryto;
