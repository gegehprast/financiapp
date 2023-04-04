import React from 'react'
import { IoRadioButtonOffOutline } from 'react-icons/io5'

interface IconProps {
    icon: string
    className: string
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
    const IconComponent = React.lazy(() => import('react-icons/io5').then((module) => ({ default: module[icon] as any })))

    return (
        <React.Suspense fallback={<IoRadioButtonOffOutline />}>
            <IconComponent className={className} />
        </React.Suspense>
    )
}

export default Icon
