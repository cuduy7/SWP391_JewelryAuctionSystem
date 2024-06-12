"use client"

import { ListProductData } from "@/types";
import Image from "next/image"
import Link from "next/link";
import {
    validateAddress,
    validateDes,
    validateName,
    validateTitle,
    validateURLAvatar,
    validateURLProduct,
    FormatTime
} from "@/utils";

const ProductOther: React.FC<ListProductData> = ({
    idPost,
    title,
    addressSlot,
    contentPost,
    days,
    startTime,
    endTime,
    quantitySlot,
    fullName,
    userImgUrl,
    price,
    highlightUrl,
    imgUrlPost,
    userId
}) => {
    return (
        <div className="relative">
            <div className="
                    relative
                    rounded-xl
                    border-2
                    border-black
                    border-opacity-10
                    cursor-pointer
                    transition-all
                    duration-500
                    shadow-sm
                    z-20
                "
                key={idPost}
            >
                <Link href={`/product/detail-product/${idPost}`}>
                    <div className="
                            relative
                            pb-[70%]
                            transition-all
                            duration-500
                            hover:scale-105
                            cursor-pointer
                        "
                    >
                        <div className="
                                absolute 
                                top-0 
                                left-0 
                                w-full 
                                h-full
                            "
                        >
                            <Image
                                src={validateURLProduct(highlightUrl)}
                                alt={`product ${idPost}`}
                                className="
                                        rounded-t-xl
                                        hover:rounded-t-xl
                                        object-cover
                                    "
                                fill
                                sizes="(max-width: 600px) 100vw, 600px"
                                draggable="false"
                            />
                        </div>
                    </div>
                    <div className="
                            p-4 
                            flex 
                            flex-col 
                            gap-2
                            transition-all
                            duration-500
                        "
                    >
                        <h1 className="
                                text-2xl 
                                font-semibold 
                                whitespace-nowrap 
                                line-clamp-1
                                transition-all
                                duration-500
                                truncate
                            "
                        >
                            {validateTitle(title)}
                        </h1>
                        <div className="flex flex-row space-x-2 items-center">
                            <span>
                                <Image
                                    src={validateURLAvatar(userImgUrl)}
                                    alt={`avatar ${userId}`}
                                    width={50}
                                    height={50}
                                    className="rounded-full w-14 h-14 object-cover border border-primary-blue-cus"
                                />
                            </span>
                            <span className="text-gray-600 font-semibold text-lg truncate">
                                {validateName(fullName)}
                            </span>
                        </div>
                        <p className="text-gray-500 line-clamp-2 min-h-[3rem]">
                            {validateDes(contentPost)}
                        </p>
                        <div className="space-x-3 line-clamp-2 h-[3rem]">
                            <span className="text-gray-500">
                                Địa điểm sân:
                            </span>
                            <span className="text-black font-semibold">
                                {validateAddress(addressSlot)}
                            </span>
                        </div>
                        <div className="whitespace-nowrap space-x-3 truncate">
                            <span className='text-gray-500'>
                                Thời gian:
                            </span>
                            <span className="text-black font-semibold">
                                <FormatTime timeString={startTime ?? "00:00"} />
                                -
                                <FormatTime timeString={endTime ?? "00:00"} />
                            </span>
                        </div>
                        <div className="space-x-3 whitespace-nowrap truncate">
                            <span className="text-gray-500">
                                Ngày chơi:
                            </span>
                            <span className="text-black font-semibold">
                                {days ?? "Chưa có"}
                            </span>
                        </div>
                        <div className="
                                text-gray-500 
                                line-clamp-1
                                space-x-3
                            "
                        >
                            <span>
                                Chỗ:
                            </span>
                            <span className="text-black font-semibold">
                                {quantitySlot ?? "Chưa có"}
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProductOther