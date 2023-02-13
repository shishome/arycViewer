import {Submission} from "./submission";
import {Reference} from "./reference";

export interface IndexedCategory {
  submissions: Submission[];
  references: Reference[];
  name: string;
}
