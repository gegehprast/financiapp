import React from 'react'

export const IconMap = {
    IoFastFoodOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoFastFoodOutline }))),
    IoCarOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoCarOutline }))),
    IoFlashOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoFlashOutline }))),
    IoGiftOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoGiftOutline }))),
    IoGlobeOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoGlobeOutline }))),
    IoWaterOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoWaterOutline }))),
    IoBookOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoBookOutline }))),
    IoCartOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoCartOutline }))),
    IoGameControllerOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoGameControllerOutline }))),
    IoWifiOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoWifiOutline }))),
    IoPhonePortraitOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoPhonePortraitOutline }))),
    IoShirtOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoShirtOutline }))),
    IoTicketOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoTicketOutline }))),
    IoAirplaneOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoAirplaneOutline }))),
    IoBarcodeOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoBarcodeOutline }))),
    IoBuildOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoBuildOutline }))),
    IoDesktopOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoDesktopOutline }))),
    IoCellularOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoCellularOutline }))),
    IoCubeOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoCubeOutline }))),
    IoLayersOutline: React.lazy(() => import('react-icons/io5').then((module) => ({ default: module.IoLayersOutline }))),
    TbGasStation: React.lazy(() => import('react-icons/tb').then((module) => ({ default: module.TbGasStation }))),
}

interface IconProps {
    icon: keyof typeof IconMap
    className: string
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
    const IconComponent = IconMap[icon]

    return <IconComponent className={className} />
}

export default Icon
