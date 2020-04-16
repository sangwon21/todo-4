import { DateUnit, dateDiff } from "../src/util/date";

describe("Test", () => {
  test("3분 시간 차이 - 3 minutes 기대", () => {
    const newDate = new Date("2020-04-15T14:02:34.247");
    const nextDate = new Date("2020-04-15T14:05:37.247");
    expect(dateDiff(newDate, nextDate)).toBe(`3 ${DateUnit.MINUTES}`);
  });

  test("2시간 시간 차이 - 2 hours 기대", () => {
    const newDate = new Date("2020-04-15T12:02:34.247");
    const nextDate = new Date("2020-04-15T14:05:37.247");
    expect(dateDiff(newDate, nextDate)).toBe(`2 ${DateUnit.HOURS}`);
  });

  test("1시간 30분 시간 차이 - 1 hours 기대", () => {
    const newDate = new Date("2020-04-15T12:30:34.247");
    const nextDate = new Date("2020-04-15T14:00:37.247");
    expect(dateDiff(newDate, nextDate)).toBe(`1 ${DateUnit.HOUR}`);
  });

  test("하루 시간 차이 - 1 day 기대", () => {
    const newDate = new Date("2020-04-14T12:02:34.247");
    const nextDate = new Date("2020-04-15T14:05:37.247");
    expect(dateDiff(newDate, nextDate)).toBe(`1 ${DateUnit.DAY}`);
  });

  test("37초 시간 차이 - 37 seconds 기대", () => {
    const newDate = new Date("2020-04-15T14:05:01.247");
    const nextDate = new Date("2020-04-15T14:05:38.247");
    expect(dateDiff(newDate, nextDate)).toBe(`37 ${DateUnit.SECONDS}`);
  });

  test("1초 시간 차이 - 1 second 기대", () => {
    const newDate = new Date("2020-04-15T14:05:37.247");
    const nextDate = new Date("2020-04-15T14:05:38.247");
    expect(dateDiff(newDate, nextDate)).toBe(`1 ${DateUnit.SECOND}`);
  });
});
