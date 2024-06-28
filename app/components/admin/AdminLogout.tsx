import { GlobalContext } from "@/contexts" // Importing GlobalContext for accessing global state
import Cookies from "js-cookie" // Importing js-cookie to handle cookies
import { useRouter } from "next/router" // Importing useRouter from next/router for navigation
import { useContext } from "react" // Importing useContext hook from React
import { ImExit } from "react-icons/im" // Importing exit icon from react-icons

// AdminLogout component
const AdminLogout = () => {
    const router = useRouter() // Using useRouter to get router instance

    // Destructuring methods from GlobalContext
    const { setUser, setIsAuthUser, setIsRefresh } = useContext(GlobalContext) || {}

    // Function to handle logout
    const handleBack = async () => {
        if (setUser && setIsAuthUser) {
            setUser(null) // Clear user state
            setIsAuthUser(false) // Set isAuthUser to false
        }
        Cookies.remove("token") // Remove token cookie
        localStorage.clear() // Clear local storage
        router.push("/").then(() => { // Navigate to home page
            if (setIsRefresh) {
                setIsRefresh(true) // Trigger refresh if setIsRefresh is available
            }
        })
    }

    return (
        <div className="
                border 
                border-black 
                border-opacity-10 
                rounded-t-xl 
                rounded-l-none 
                bg-white 
                text-gray-600 
                hover:text-primary-blue-cus 
                mt-auto
                lg:flex-none
                flex
                items-start
            "
        >
            <button className="flex flex-row space-x-2 p-6 lg:items-center cursor-pointer" type="button" onClick={handleBack}>
                <div className="flex-shrink-0">
                    <ImExit size={24} /> {/* Exit icon */}
                </div>
                <p className="text-lg font-medium">
                    Đăng Xuất {/* Logout text */}
                </p>
            </button>
        </div>
    )
}

export default AdminLogout // Exporting the component
