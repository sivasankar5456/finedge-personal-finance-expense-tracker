const cache = require("../services/cacheService");

describe("Cache Service", () => {

  test("should store and retrieve value", () => {

    cache.set("test-key", { value: 100 }, 5000);

    const result = cache.get("test-key");

    expect(result).toEqual({ value: 100 });

  });

  test("should return null for expired cache", (done) => {

    cache.set("expire-key", { value: 50 }, 10);

    setTimeout(() => {
      const result = cache.get("expire-key");
      expect(result).toBeNull();
      done();
    }, 20);

  });

});