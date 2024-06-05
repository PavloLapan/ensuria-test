import * as axios from "axios";


export const fetchDatasetList = async (): Promise<any> => {
    const response = await axios.get(
        'https://parseapi.back4app.com/classes/ListOfNamesDataset_AllNames?limit=1000',
        {
            headers: {

            },
        }
    );
    return response.data.results.map((item: any) => ({ // todo - debug response item
        label: item.name,
        value: item.objectId,
    }));
};
