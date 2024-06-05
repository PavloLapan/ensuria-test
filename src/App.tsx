import {SetStateAction, useEffect, useState} from 'react'
import './App.css'
import {Select} from "./Ui/Shared/Select.tsx";
import {useSelectOptionsStore} from "./Store/SelectValues.tsx";
import {Spinner} from "./Ui/Shared/Spinner.tsx";

function App() {
    const [selectValue, setSelectValue] = useState<string | undefined>('')
    const {fetch, loading, data} = useSelectOptionsStore()
    const handleSelectChange = (
        value: SetStateAction<string | undefined>
    ) => {
        setSelectValue(value);
    };

    useEffect(() => {
        fetch()
    },[])

    if(loading){
        return <Spinner />
    }
    
  return (
    <>
        <div>
            Ensuria Test Task For Select
        </div>
      <Select
          onChange={handleSelectChange}
          options={data}
          className={''}
          value={selectValue}
      />
    </>
  )
}

export default App
