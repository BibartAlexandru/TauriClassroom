import { TimePeriod } from "./time-period.model";

export interface ICourse {
  _id: string;
  subject_id: string;
  teacher_id: string;
  class_id: string;
  time_period: TimePeriod;
}
