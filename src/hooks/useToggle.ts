import { useState } from 'react'

export function useToggle(intValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState(intValue)

    const toggleValue = () => setValue(!value)

    return [value, toggleValue]
}