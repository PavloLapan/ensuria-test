import {DatasetListStore} from "./SelectValues.types.ts";
import {create} from "zustand";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {fetchDatasetList} from "../Api/datasetList.ts";
import {immer} from 'zustand/middleware/immer';


export const useSelectOptionsStore =
  create<DatasetListStore>()(
    devtools(
      persist(
        immer(set => ({
          data: [],
          loading: false,
          error: undefined,

          fetch: async () => {
            set({loading: true});
            try {
              const response = await fetchDatasetList();
              set({data: response});
            } catch (error) {
              set({error: (error as Error).message});
            } finally {
              set({loading: false});
            }
          },

          clearData: () => {
            set({data: undefined});
          },
        })),
        {
          name: 'dataListStore',
          storage: createJSONStorage(() => sessionStorage),
        }
      )
    )
  );

