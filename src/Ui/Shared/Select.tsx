import {ChangeEventHandler, FC} from "react";
import './Select.scss'

type SelectProps = {
    onChange: ChangeEventHandler<HTMLSelectElement>,
    options: [
        {
            value: string,
            label: string
        }
    ], // sometimes we need to define select Options as array of objects, I`ll see later how API will give me data
    placeholder?: string,
    value: string | undefined,
    className?: string
}
export const Select: FC<SelectProps> = ({options, value, onChange, placeholder, className}) => {

    return (
        <select
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder || 'Select an option'}
            className={className}
        >
            {options?.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}