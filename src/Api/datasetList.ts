import {DatasetList} from "../Types/DatasetList.ts";

export const fetchDatasetList = async (): Promise< [] | DatasetList[] | undefined> => {
    const response = await fetch(
        'https://parseapi.back4app.com/classes/Listofnames_Complete_List_Names?count=1&limit=1000',
        {
            headers: {
                'X-Parse-Application-Id': 'QEcIPpq3HwAAumfH3hHWwmqEhm1u48pxkix06stp', // This is your app's application id
                'X-Parse-REST-API-Key': 'yt24YQigRhLhk1zq2WO1vc72FUHfkGCvkgF2YL9W', // This is your app's REST API key
            }
        }
    );

    const data = await response.json()
    return data.results
};
