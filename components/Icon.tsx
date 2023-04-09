import React from 'react'
import {
    IoRadioButtonOffOutline,
    IoCarSportOutline,
    IoFastFoodOutline,
    IoBagOutline,
    IoFlashOutline,
    IoWaterOutline,
    IoWifiOutline,
    IoCellularOutline,
    IoTicketOutline,
    IoShieldCheckmarkOutline,
    IoMedkitOutline,
    IoConstructOutline,
    IoSchoolOutline,
    IoBookOutline,
    IoFilmOutline,
    IoGameControllerOutline,
    IoAirplaneOutline,
    IoPhonePortraitOutline,
    IoShirtOutline,
    IoHeartOutline,
    IoCloudOutline,
    IoDiamondOutline,
    IoWomanOutline,
    IoPeopleOutline,
    IoReceiptOutline,
    IoReturnDownForwardOutline,
    IoAppsOutline,
    IoWalletOutline,
    IoCashOutline,
    IoGiftOutline,
    IoReturnDownBackOutline,
} from 'react-icons/io5'

const IconMap = {
    IoCarSportOutline: IoCarSportOutline,
    IoFastFoodOutline: IoFastFoodOutline,
    IoBagOutline: IoBagOutline,
    IoFlashOutline: IoFlashOutline,
    IoWaterOutline: IoWaterOutline,
    IoWifiOutline: IoWifiOutline,
    IoCellularOutline: IoCellularOutline,
    IoTicketOutline: IoTicketOutline,
    IoShieldCheckmarkOutline: IoShieldCheckmarkOutline,
    IoMedkitOutline: IoMedkitOutline,
    IoConstructOutline: IoConstructOutline,
    IoSchoolOutline: IoSchoolOutline,
    IoBookOutline: IoBookOutline,
    IoFilmOutline: IoFilmOutline,
    IoGameControllerOutline: IoGameControllerOutline,
    IoAirplaneOutline: IoAirplaneOutline,
    IoPhonePortraitOutline: IoPhonePortraitOutline,
    IoShirtOutline: IoShirtOutline,
    IoHeartOutline: IoHeartOutline,
    IoCloudOutline: IoCloudOutline,
    IoDiamondOutline: IoDiamondOutline,
    IoWomanOutline: IoWomanOutline,
    IoPeopleOutline: IoPeopleOutline,
    IoReceiptOutline: IoReceiptOutline,
    IoReturnDownForwardOutline: IoReturnDownForwardOutline,
    IoAppsOutline: IoAppsOutline,
    IoWalletOutline: IoWalletOutline,
    IoCashOutline: IoCashOutline,
    IoGiftOutline: IoGiftOutline,
    IoReturnDownBackOutline: IoReturnDownBackOutline,
}

interface IconProps {
    icon: string
    className: string
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
    const Component = IconMap[icon as keyof typeof IconMap] ? IconMap[icon as keyof typeof IconMap] : IoRadioButtonOffOutline

    return <React.Suspense fallback={<IoRadioButtonOffOutline />}>{<Component className={className} />}</React.Suspense>
}

export default Icon
