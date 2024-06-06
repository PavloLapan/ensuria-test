import {DatasetList} from "../Types/DatasetList.ts";

export type DatasetListState = {
  data: [] | DatasetList[];
  loading: boolean;
  error?: string;
};

export type DatasetListActions = {
  fetch: () => Promise<void>;
  clearData: () => void
};

export type DatasetListStore = DatasetListState &
  DatasetListActions;
