export interface Submission {
  submissionId: string;
  folder: string;
  category: string;
  mainFile: any;
  variants?: any;
  tags?: Array<string>;
  r18: boolean;
  hide: boolean;
  arycHelper: boolean;
  artist: string;
  url: string;
  dateCreated: number;
}
