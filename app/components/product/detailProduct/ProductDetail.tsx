"use client"

import { ProductDetailContentData } from "@/types"
import { Button } from "../../providers"
import { FormatTime, formatMoney, validateAddress, validateTitle } from "@/utils"
import React, { useContext, useState } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { addHours, format, parse, parseISO } from "date-fns"
import Decimal from "decimal.js"
import { IoTimeOutline } from "react-icons/io5"
import { MdOutlineAttachMoney, MdOutlineDateRange } from "react-icons/md"
import { useContinuePaymentModal, usePolicyModal, useUnauthorizeModal } from "@/hooks"
import ProductMethod from "./ProductMethod"

const ProductDetail: React.FC<ProductDetailContentData> = ({
    id,
    addressSlot,
    levelSlot,
    categorySlot,
    slotInfos,
    title,
    userId
}) => {
    const { user, isAuthUser } = useContext(GlobalContext) || {}
    const unauthorizeModal = useUnauthorizeModal()
    const continuePaymentModal = useContinuePaymentModal()
    const policyModal = usePolicyModal()

    const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: number }>({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [checkedStatus, setCheckedStatus] = useState<{ [key: string]: boolean }>({})
    const [methodChecked, setMethodChecked] = useState<boolean>(false)

    const checkUser = user && user.id === userId || user && user.role && user.role.toLowerCase() !== "user"

    const handleCheckboxChange = (date: string, isChecked: boolean, price: number, item: any) => {
        if (item.availableSlot === 0) {
            toast.error(`Không có chỗ nào khả dụng`, {
                position: toast.POSITION.TOP_RIGHT
            })
            setCheckedStatus(prevState => ({ ...prevState, [date]: false }))
            return
        }

        setSelectedSlots(prevState => {
            if (isChecked) {
                setTotalPrice(prevPrice => prevPrice + price);
                return {
                    ...prevState,
                    [date]: 1
                }
            } else {
                setTotalPrice(prevPrice => prevPrice - price);
                const { [date]: _, ...rest } = prevState;
                return rest;
            }
        })

        setCheckedStatus(prevState => ({ ...prevState, [date]: isChecked }))
    }

    const handleInputChange = (date: string, value: number, item: any) => {
        if (value === 0) {
            setTotalPrice(prevPrice => prevPrice - item.price * selectedSlots[date]);
            const { [date]: _, ...rest } = selectedSlots;
            setSelectedSlots(rest);
            setCheckedStatus(prevState => ({ ...prevState, [date]: false }))
            return
        }

        if (item && item.availableSlot) {
            if (value > item.availableSlot) {
                toast.error(`Bạn chỉ có thể nhập tối đa ${item.availableSlot}`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                return
            }
            setTotalPrice(prevPrice => prevPrice + item.price * (value - selectedSlots[date]));
            setSelectedSlots(prevState => ({
                ...prevState,
                [date]: value
            }))
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        if (!/^\d+$/.test(keyValue))
            event.preventDefault();
    }

    const handleCheckedMethod = (isChecked: boolean) => {
        setMethodChecked(isChecked);
    }

    const handleClickHost = () => {
        toast.error("Bạn là chủ sân không thể đặt chỗ trong bài đăng của mình", {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    const handleClick = () => {
        let slotsInfoArray: { dateRegis: string, numSlots: number }[] = []

        if (!selectedSlots || Object.keys(selectedSlots).length === 0) {
            toast.error("Phải chọn ngày bạn muốn đặt", {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }

        for (const date in selectedSlots) {
            const slot = selectedSlots[date]

            if (!date || slot === 0) {
                toast.error("Phải chọn ngày và chỗ", {
                    position: toast.POSITION.TOP_RIGHT
                })
                return
            }

            const dateObj = parse(date, 'dd/MM/yyyy', new Date());
            const newDateObj = addHours(dateObj, 7);
            const slotInfo = { dateRegis: newDateObj.toISOString(), numSlots: slot }
            slotsInfoArray.push(slotInfo)
        }

        if (user && user.id) {
            if (!user.isPolicy) {
                policyModal.onOpen(user.id)
                return
            }
        }

        if (id) {
            continuePaymentModal.setSlotsIdArray(slotsInfoArray)
            continuePaymentModal.setCheckMethod(methodChecked)
            continuePaymentModal.onOpen(id)
        }
    }

    return (
        <div className="
                relative
                bg-gray-200
                flex 
                flex-col 
                w-full 
                rounded-xl 
                px-4
                gap-3
                justify-around
                transition-all
                duration-500
                lg:min-h-[30rem]
                max-h-auto
            "
            key={id ?? "1"}
        >
            <h1 className="text-3xl font-semibold text-gray-600">
                {validateTitle(title)}
            </h1>
            <section className="relative space-x-3">
                <span className="whitespace-nowrap font-semibold text-gray-600">
                    Địa chỉ:
                </span>
                <span className="break-words font-semibold">
                    {validateAddress(addressSlot)}
                </span>
            </section>
            <section className="relative font-semibold flex flex-col gap-2">
                <label className="whitespace-nowrap text-gray-600">
                    Chọn chỗ đặt:
                </label>
                {slotInfos && slotInfos.map((item, index) => {
                    const date = format(parseISO(item.startTime), 'dd/MM/yyyy')
                    const startTime = format(parseISO(item.startTime), 'HH:mm')
                    const endTime = format(parseISO(item.endTime), 'HH:mm')
                    
                    return (
                        <div className="break-words flex flex-wrap items-center gap-2 border border-black border-opacity-10 rounded-lg p-2" key={index}>
                            {!checkUser && (
                                <input
                                    type="checkbox"
                                    checked={checkedStatus[date] || false}
                                    onChange={(e) => handleCheckboxChange(date, e.target.checked, item.price, item)}
                                    className="ring-0 outline-none focus:ring-0 focus:outline-none"
                                />
                            )}
                            <div className="flex space-x-1 items-center w-28">
                                <span>
                                    <MdOutlineDateRange size={20} color="#204D94" />
                                </span>
                                <span>
                                    {date}
                                </span>
                            </div>
                            <div className="flex space-x-1 items-center w-36">
                                <span>
                                    <IoTimeOutline size={20} color="#204D94" />
                                </span>
                                <span>
                                    <FormatTime timeString={startTime} /> - <FormatTime timeString={endTime} />
                                </span>
                            </div>
                            <div className="flex items-center w-48 max-w-full">
                                <span>
                                    <MdOutlineAttachMoney size={20} color="#204D94" />
                                </span>
                                <span className="text-primary-blue-cus">
                                    {formatMoney(new Decimal(item.price))}/Chỗ
                                </span>
                            </div>
                            {checkUser ? (
                                <section className="flex space-x-1 items-center">
                                    <label>
                                        Số chỗ còn lại:
                                    </label>
                                    <span>
                                        {item.availableSlot}
                                    </span>
                                </section>
                            ) : (
                                <section className="flex space-x-1 items-center">
                                    <label>
                                        Số chỗ đặt:
                                    </label>
                                    <input
                                        type="number"
                                        pattern="^(0|[1-9][0-9]*)$"
                                        min={selectedSlots[date] || 0}
                                        max={item.availableSlot}
                                        value={selectedSlots[date] || 0}
                                        disabled={!selectedSlots[date]}
                                        onChange={(e) => handleInputChange(date, Number(e.target.value), item)}
                                        onKeyPress={handleKeyPress}
                                        className={`px-1 py-1 w-8 text-center ${selectedSlots[date] ? '' : 'cursor-not-allowed bg-gray-300'}`}
                                    />
                                    <span>
                                        /{item.availableSlot}
                                    </span>
                                </section>
                            )}
                        </div>
                    )
                })}
            </section>
            <div className="flex gap-5">
                <section className="relative flex gap-3 font-semibold">
                    <label className="whitespace-nowrap text-gray-600">
                        Thể loại:
                    </label>
                    <span className="break-words">
                        {categorySlot ?? "Chưa có"}
                    </span>
                </section>
                <section className="relative flex gap-3 font-semibold">
                    <label className="whitespace-nowrap text-gray-600">
                        Kĩ năng:
                    </label>
                    <span className="break-words">
                        {levelSlot ?? "Chưa có"}
                    </span>
                </section>
            </div>
            {!checkUser && (
                <ProductMethod onCheckedChange={handleCheckedMethod} />
            )}
            {!checkUser && (
                <section className="relative flex gap-3 font-semibold items-end">
                    <label className="whitespace-nowrap text-gray-600">
                        Tổng tiền:
                    </label>
                    <span className="break-words text-primary-blue-cus text-xl">
                        {formatMoney(new Decimal(totalPrice))}
                    </span>
                </section>
            )}
            {user && user.id === userId ? (
                <Button
                    title="Đặt chỗ ngay"
                    style="py-3 justify-center"
                    onClick={handleClickHost}
                />
            ) : !isAuthUser ? (
                <Button
                    title="Đặt chỗ ngay"
                    style="py-3 justify-center"
                    onClick={unauthorizeModal.onOpen}
                />
            ) : !checkUser && (
                <Button
                    title="Đặt chỗ ngay"
                    style="py-3 justify-center"
                    onClick={handleClick}
                />
            )}
        </div>
    )
}

export default ProductDetail