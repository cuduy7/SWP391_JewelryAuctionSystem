"use client"

import { ProductDetailContentData } from "@/types";
import { Button, Rating } from "../../providers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { validateDes, validateName, validateURLAvatar } from "@/utils";
import { BsFacebook } from "react-icons/bs";
import { VscLinkExternal } from "react-icons/vsc";
import { useReportPostModal, useUnauthorizeModal } from "@/hooks";
import { useContext } from "react";
import { GlobalContext } from "@/contexts";
import { toast } from "react-toastify";

const ProductUserPost: React.FC<ProductDetailContentData> = ({
    id,
    title,
    contentPost,
    imgUrlUser,
    sortProfile,
    fullName,
    totalRate,
    userId
}) => {
    const router = useRouter()
    const { user } = useContext(GlobalContext) || {}

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        router.push(`/user/profile-user/${userId}`)
        event.preventDefault()
    }

    const reportPostModal = useReportPostModal()
    const unauthorizeModal = useUnauthorizeModal()

    const handleShare = () => {
        const url = window.location.href;
        const width = 600;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        const features = `width=${width},height=${height},left=${left},top=${top}`;
        const newWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', features);
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Đã lấy đường link thành công!", {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    return (
        <div className="relative py-10" key={id}>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold text-gray-600">
                        Mô tả:
                    </h3>
                    <p className="text-lg text-gray-500">
                        {validateDes(contentPost)}
                    </p>
                </div>
                <div className="
                        flex 
                        flex-row
                        gap-5
                        items-center
                    "
                >
                    <div className="relative flex-shrink-0">
                        <Image
                            src={validateURLAvatar(imgUrlUser)}
                            alt="avatar"
                            className="object-cover rounded-full w-40 h-40"
                            width={120}
                            height={120}
                            draggable="false"
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-3 items-center">
                            <h1 className="text-3xl text-gray-600 font-semibold">
                                {validateName(fullName)}
                            </h1>
                            <Rating rating={totalRate ?? 0} maxStars={5} sizeCus={20} />
                        </div>
                        <div className="relative">
                            <Button
                                title="Xem trang cá nhân"
                                style=""
                                onClick={handleClick}
                            />
                        </div>
                        <div className="text-gray-500 text-xl line-clamp-3">
                            {validateDes(sortProfile)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="text-2xl text-gray-600 font-semibold">
                        Chia sẻ về bài viết này:
                    </div>
                    <div className="flex flex-row items-center space-x-5">
                        <BsFacebook size={40} className="text-blue-600 cursor-pointer" onClick={handleShare} />
                        <VscLinkExternal size={40} className="cursor-pointer" onClick={handleCopyLink} />
                        <div className="flex-grow"></div>
                        {!user ? (
                            <button
                                className="
                                    text-base 
                                    text-gray-500 
                                    hover:underline 
                                    cursor-pointer 
                                    text-right
                                "
                                onClick={unauthorizeModal.onOpen}
                            >
                                Báo cáo bài đăng
                            </button>
                        ) : (
                            user && user.id && user.id.toString() === userId || user && user.role && user.role.toLowerCase() !== "user" ? (
                                <></>
                            ) : (
                                <button
                                    className="
                                        text-base 
                                        text-gray-500 
                                        hover:underline 
                                        cursor-pointer 
                                        text-right
                                    "
                                    onClick={reportPostModal.onOpen}
                                >
                                    Báo cáo bài đăng
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUserPost