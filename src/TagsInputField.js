import { forwardRef, useCallback, useEffect } from "react"
import { nanoid } from "nanoid"
import AsyncCreatableSelect from "react-select/async-creatable"
import { components } from "react-select"
import { ProfileData } from "./data/profileData"
import { COLORS } from "./data/COLORS"

export const TagsInputField = forwardRef(({
    tags,
    setTags
}, ref) => {

    const addTag = (value) => setTags(prevState => [...prevState, value])

    const handleCreateOption = async (value) => {
        const additionalOption = createOption(value)

        addTag(additionalOption)
    }

    // function to remove tags on Backspace key press
    const listener = useCallback((e) => {
        if (e.key === 'Backspace') {
            setTags(prev => prev.filter((_, i) => i !== tags.length - 1))
            if (ref?.current) ref.current.focus()
        }

    }, [ref, tags, setTags])

    // add "keydown" event listener
    useEffect(() => {
        if (ref?.current) ref.current.focus()

        document.addEventListener("keydown", listener)

        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [ref, listener])

    return (
        <AsyncCreatableSelect
            ref={ref}
            name="tags"
            value={{}}
            loadOptions={(value) => promiseOptions(value, tags)}
            menuPlacement={'auto'}
            components={{ LoadingIndicator: null, Option, SinleValue }}
            classNamePrefix="select"
            placeholder="Type somthing here"
            styles={tagsListStyles}
            cacheOptions
            onCreateOption={handleCreateOption}
            onChange={addTag}
        />
    )
})

// "fetch" options from "backend"
const promiseOptions = (inputValue, tags) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(filterTags(inputValue, tags))
        }, 1000)
    }
)

// filter already selected tags
// and filter tags from "backend" by input value
const filterTags = (inputValue, tags) => {
    return ProfileData.filter(x => !tags.includes(x)).filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    )
}

const createOption = (value) => ({
    id: nanoid(),
    value,
    label: value,
    color: COLORS[16]
})

// And let's add some custom styling to react-select component
const SinleValue = (props) => {

    const { data } = props

    return (
        <components.SingleValue {...props}>
            <div className="Select-option">
                <span className="SelectColorSingleValue" style={{
                    backgroundColor: data.color
                }}>
                    {data.label}
                </span>
            </div>
        </components.SingleValue>
    )
}

const Option = (props) => {

    const {data} = props

    return (
        <components.Option {...props}>
            <div className="Select-option">
                <span>
                    {data.label}
                </span>
            </div>
        </components.Option>
    )
}

const tagsListStyles = ({
    container: (provided) => ({
        ...provided,
        width: "100%"
    }),

    control: (provided, state) => ({
        ...provided,
        height: 28,
        minHeight: 28,
        width: "100%",
        fontSize: 14,
        borderRadius: 6,
        padding: '0 0 0 8px',
        ':hover': {
            cursor: 'pointer'
        },
        borderColor: 'transparent',
        border: state.isFocused ? '1px solid transparent' : '1px solid #transparent',
        boxShadow: state.isFocused ? 0 : 0,
        boxSizing: 'border-box',
        '&:hover': {
            borderColor: state.isFocused ? 'transparent' : 'transparent',
            boxShadow: state.isFocused ? 0 : 0,
            boxSizing: 'border-box',
        }
    }),

    valueContainer: (provided) => ({
        ...provided,
        padding: 0
    }),

    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    }),

    indicatorContainer: (provided) => ({
        ...provided,
        padding: 3
    }),

    dropdownIndicator: (provided) => ({
        ...provided,
        display: 'none'
    }),

    menu: (provided) => ({
        ...provided,
        boxShadow: '0 0 0 1px rgb(111 119 130 / 15%), 0 5px 20px 0 rgb(21 27 38 / 8%)',
        background: '#fff',
        width: "100%",
        boxSizing: 'border-box',
        margin: 0
    }),

    option: (provided, {isSelected}) => ({
        ...provided,
        color: "#151b26",
        fontSize: 14,
        minHeight: "36px",
        backgroundColor: isSelected && "#fff" ,
        ':hover': {
            cursor: 'pointer',
            backgroundColor: " #f2f6f8"
        }
    })
})