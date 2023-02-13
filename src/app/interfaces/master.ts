import {Category} from "./category";
import {Submission} from "./submission";
import {Reference} from "./reference";

export interface Master {
  categories: Category[];
  submissions: Submission[];
  references: Reference[];
}
