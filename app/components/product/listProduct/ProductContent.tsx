"use client"

import Image from "next/image"
import { ListProductData } from "@/types"
import { FormatTime, formatMoney, validateAddress, validateDes, validateName, validateURLAvatar, validateURLProduct } from "@/utils"
import Decimal from "decimal.js"
import Link from "next/link"

const ProductContent: React.FC<ListProductData> = ({
    idPost,
    title,
    contentPost,
    addressSlot,
    highlightUrl,
    imgUrlPost,
    days,
    startTime,
    endTime,
    price,
    quantitySlot,
    fullName,
    userImgUrl,
    userId
}) => {
    return (
        <Link className="
                grid 
                md:grid-cols-11 
                grid-cols-1
                border-2 
                rounded-xl
                h-auto
                w-auto
                mb-4
                relative
            "
            key={idPost}
            href={`/product/detail-product/${idPost}`}
        >
            <div className="md:col-span-5 col-span-1">
                <div className="
                        relative
                        md:h-full
                        sm:h-96
                        h-80
                        transition-all
                        duration-500
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
                            alt="QuickList"
                            className="
                                md:rounded-l-xl
                                md:rounded-r-none
                                rounded-t-xl
                                object-cover
                            "
                            placeholder="blur"
                            blurDataURL={validateURLProduct(highlightUrl)}
                            sizes="(max-width: 600px) 100vw, 600px"
                            fill
                        />
                    </div>
                </div>
            </div>
            <div className="md:col-span-6 col-span-1 p-4">
                <div className="
                        flex 
                        flex-col 
                        gap-3
                    "
                >
                    <div>
                        <h3 className="text-3xl font-semibold text-[#922049] truncate">
                            {title}
                        </h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="flex-shrink-0 relative">
                                <Image
                                    src={validateURLAvatar(userImgUrl)}
                                    alt={`avatar ${userId}`}
                                    width={50}
                                    height={50}
                                    className="object-cover w-14 h-14 rounded-full border border-primary-blue-cus"
                                />
                            </div>
                            <div className="text-xl text-gray-600 font-medium">
                                {validateName(fullName)}
                            </div>
                        </div>
                        <div className="flex-nowrap flex-shrink-0 text-2xl font-semibold text-primary-blue-cus">
                            {formatMoney(new Decimal(price ?? 0))}/Chỗ
                        </div>
                    </div>
                    <div className="text-lg text-gray-500 line-clamp-2 min-h-[3rem]">
                        Mô tả ngắn: {validateDes(contentPost)}
                    </div>
                    <div className="space-x-1 text-lg text-gray-500">
                        <span>Địa điểm sân:</span>
                        <span className="font-semibold text-black">
                            {validateAddress(addressSlot)}
                        </span>
                    </div>
                    <div className="flex space-x-1 text-lg text-gray-500">
                        <span>Ngày:</span>
                        <span className="font-semibold text-black">
                            {days ?? "Chưa có"}
                        </span>
                    </div>
                    <div className="flex space-x-1 text-lg text-gray-500">
                        <span>Thời gian mở cửa:</span>
                        <span className="font-semibold text-black">
                            <FormatTime timeString={startTime ?? "00:00"} />
                            -
                            <FormatTime timeString={endTime ?? "00:00"} />
                        </span>
                    </div>
                    <div className="flex space-x-1 text-lg text-gray-500">
                        <span>Chỗ:</span>
                        <span className="font-semibold text-black">
                            {quantitySlot ?? "Chưa có"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductContent