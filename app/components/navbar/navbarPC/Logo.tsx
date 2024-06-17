import Image from "next/image"
import Link from "next/link";

const Logo = () => {
    return (
        <div className="
                    flex
                    items-center
                    py-4
                    pr-4
                    relative
                "
        >
            <Link href="/" className="hidden xl:block relative" >
                <Image
                    alt="Logo"
                    className="
                        cursor-pointer 
                        self-center 
                        fill-transparent
                        object-contain
                        w-auto
                        h-auto
                    "
                    height="150"
                    width="150"
                    src="/images/logo_1.png"
                />
            </Link>
            <Link href="/" className="hidden xl:hidden lg:block relative">
                <Image
                    src="/images/Vector.png"
                    alt="Logo"
                    height="40"
                    className="
                        cursor-pointer 
                        self-center 
                        fill-transparent
                        object-contain
                        w-auto
                        h-auto
                    "
                    width="40"
                />
            </Link>
        </div>
    )
}

export default Logo