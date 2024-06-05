
export type DatasetListState = {
    data: [];
    loading: boolean;
    error?: string;
};

export type DatasetListActions = {
    fetch: () => Promise<void>;
    clearData:  () => void
};

export type DatasetListStore = DatasetListState &
    DatasetListActions;
