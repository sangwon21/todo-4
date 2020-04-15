import { dateShow } from "../src/util/date";

describe("Test", () => {
  test("Hello", () => {
    console.log("hello");
    expect(dateShow()).toBe(1);
  });
});
