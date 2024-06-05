import {SetStateAction, useEffect, useState} from 'react'

import './App.css'
import {Select} from "./Ui/Shared/Select.tsx";

function App() {
    const [selectValue, setSelectValue] = useState<string | undefined>('')
    const options = ''
    const handleSelectChange = (
        value: SetStateAction<string | undefined>
    ) => {
        setSelectValue(value);
    };

    useEffect(() => {

    },[])

  return (
    <>
        <div>
            Ensuria Test Task For Select
        </div>
      <Select
          onChange={handleSelectChange}
          options={options}
          className={''}
          value={selectValue}
      />
    </>
  )
}

export default App
