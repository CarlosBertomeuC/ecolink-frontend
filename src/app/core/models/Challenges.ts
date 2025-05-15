import { Ods } from "./Ods";

export interface Challenge {
  id: number;
  companyName: string;
  title: string;
  description: string;
  budget: number;
  endDate: Date;
  odsList: Ods[];
  timeLeft: number;
  numberOfParticipans: number;
  premium: boolean;
}
