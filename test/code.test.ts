import { dateParser } from "../src/libs/date";
import { EventCount, EventSummary } from "../src/model";
import { EventMockRepository } from "../src/repository/mock";
import { EventUsecase } from "../src/usecases";

const repository = new EventMockRepository();
const usecase = new EventUsecase(repository);

const sampleEvents: EventCount[] = [
  {
    id: "SIDhvg80qhg0eod",
    name: "foo",
    comment: "hoge",
    date: dateParser().toDate("2021-01-23T10:00:00Z"),
    value: 10,
  },
  {
    id: "aFj0q923tjpomaG",
    date: dateParser().toDate("2021-01-24T10:00:00Z"),
    comment: "hoge",
    value: -5,
  },
  {
    id: "LAafkOQJFI0TSqj",
    name: "foo",
    date: dateParser().toDate("2021-01-24T11:00:00Z"),
    value: 7,
  },
];

const toIds = (events: EventCount[]): string[] => {
  return events.map((e) => e.id);
};

describe("code.ts filter test", () => {
  test("fetch", () => {
    const events = usecase.fetchCount();
    expect([
      "abcdefghijklmn",
      "IOJRGIOJGWGojg",
      "Skopj42jgiosjd",
    ]).toMatchObject(toIds(events));
  });

  test("summary", () => {
    const summary = usecase.calcStatisticalSummary(sampleEvents);

    const expected: EventSummary = {
      average: 4,
      variance: 42,
      min: -5,
      max: 10,
      sum: 12,
    };
    expect(expected).toMatchObject(summary);
  });

  test("extract by has name", () => {
    const events = usecase.extractHasName(sampleEvents);
    expect(["SIDhvg80qhg0eod", "LAafkOQJFI0TSqj"]).toMatchObject(toIds(events));
  });

  test("extract by has comment", () => {
    const events = usecase.extractHasComment(sampleEvents);
    expect(["SIDhvg80qhg0eod", "aFj0q923tjpomaG"]).toMatchObject(toIds(events));
  });

  test("extract by after date", () => {
    const events = usecase.extractAfterDate(
      sampleEvents,
      new Date("2021-01-24T10:30:00Z")
    );
    expect(["LAafkOQJFI0TSqj"]).toMatchObject(toIds(events));
  });

  test("extract by after date (boundary value)", () => {
    const events = usecase.extractAfterDate(
      sampleEvents,
      new Date("2021-01-24T09:00:00Z")
    );
    expect(["aFj0q923tjpomaG", "LAafkOQJFI0TSqj"]).toMatchObject(toIds(events));
  });

  test("extract by after date (no items)", () => {
    const events = usecase.extractAfterDate(
      sampleEvents,
      new Date("2021-10-24T09:00:00Z")
    );
    expect([]).toMatchObject(toIds(events));
  });
});
