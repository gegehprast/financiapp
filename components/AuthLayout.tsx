import Link from 'next/link'
import React, { ReactElement, useRef } from 'react'
import ArrowRightOnRectangle from './icons/ArrowRightOnRectangle'
import Menu from './Menu'
import useAuth from '@/hooks/useAuth'

interface Props {
    children: ReactElement
}

const AuthLayout = ({ children }: Props) => {
    const { auth } = useAuth({ redirectTo: '/', redirectIfFound: true })

    return <main className="relative w-full h-screen mx-auto overflow-hidden bg-white lg:w-1/2 xl:w-1/4">{children}</main>
}

export default AuthLayout
