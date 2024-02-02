export type TOption = {
  text: string;
  nextEntry: string;
  conditions?: {
    key: string;
    values: string[];
  }[];
  actions?: {
    key: string;
    value: any;
    conditions?: {
      key: string;
      values: string[];
    }[];
  }[];
};

export type TEntry = {
  id: string;
  desc: string[];
  options?: TOption[];
};

export type TStory = {
  title: string;
  baseEntry: string;
  entries: TEntry[];
};
