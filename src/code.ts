import { EventSpreadSheetRepository } from "./repository/spreadsheet";
import { EventUsecase } from "./usecases";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const main = () => {
  const repository = new EventSpreadSheetRepository();
  const usecase = new EventUsecase(repository);

  const events = usecase.fetchCount();
  Logger.log(events);

  const summary = usecase.calcStatisticalSummary(events);
  Logger.log(summary);

  const uniqueNames = Array.from(
    new Set(usecase.extractHasName(events).map((e) => e.name))
  );
  Logger.log(uniqueNames);

  const comments = usecase.extractHasComment(events).map((e) => e.comment);
  Logger.log(comments);
};
