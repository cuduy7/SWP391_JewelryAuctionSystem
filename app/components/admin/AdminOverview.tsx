"use client"

import { GlobalContext } from "@/contexts"; // Importing GlobalContext for accessing global state
import { OptionsOverviewProps } from "@/types" // Importing OptionsOverviewProps type
import { customStyles } from "@/utils"; // Importing customStyles for Select component styling
import { useContext } from "react"; // Importing useContext hook from React
import Select from 'react-select' // Importing Select component from react-select

// AdminOverview component
const AdminOverview: React.FC<OptionsOverviewProps> = ({
    options,
    onOptionSelect,
    selectedOption
}) => {
    // Mapping options to the format required by react-select
    const selectOptions = options.map(option => ({
        value: option.id,
        label: option.label,
        icon: option.icon,
    }))

    // Handling selection change in react-select
    const handleChange = (selectedOption: any) => {
        onOptionSelect(selectedOption.value); // Calling onOptionSelect with the selected option's value
    }

    const { user } = useContext(GlobalContext) || {} // Accessing user from GlobalContext

    return (
        <div className="
                flex 
                flex-col 
                border 
                border-black 
                border-opacity-10 
                rounded-r-xl 
                bg-white 
                px-6 
                h-full
                gap-5
                py-5
                lg:py-10 
                lg:gap-10 
            "
        >
            <div className="
                    relative
                    flex
                    flex-row
                    justify-between
                    items-center
                    lg:flex-col 
                    lg:justify-normal
                    lg:items-baseline
                "
            >
                <div className="text-gray-600 font-semibold text-2xl">
                    {user && user.fullName} {/* Displaying user's full name */}
                </div>
                <div className="text-xl font-semibold italic text-gray-500">
                    {user && user.role} {/* Displaying user's role */}
                </div>
            </div>
            <div className="border-b border-black border-opacity-10" /> {/* Divider */}
            <div className="
                    lg:flex
                    lg:flex-col
                    lg:gap-10
                    hidden
                "
            >
                {/* Rendering options as buttons for large screens */}
                {options.map((option) => (
                    <button className={`
                            relative 
                            flex 
                            flex-row 
                            items-center 
                            space-x-2 
                            cursor-pointer 
                            hover:text-primary-blue-cus 
                            text-gray-600
                            ${selectedOption === option.id ? 'text-primary-blue-cus font-semibold' : ''}
                        `}
                        key={option.id}
                        onClick={() => onOptionSelect(option.id)}
                    >
                        <div className="flex-shrink-0">
                            <option.icon size={24} /> {/* Rendering option icon */}
                        </div>
                        <p className="text-lg font-medium text-left">
                            {option.label} {/* Rendering option label */}
                        </p>
                    </button>
                ))}
            </div>
            <div className="lg:hidden block">
                {/* Rendering react-select for small screens */}
                <Select
                    options={selectOptions}
                    onChange={handleChange}
                    isSearchable={false}
                    value={selectOptions.find(option => option.value === selectedOption)}
                    styles={customStyles} // Applying custom styles
                />
            </div>
        </div>
    )
}

export default AdminOverview // Exporting the component
