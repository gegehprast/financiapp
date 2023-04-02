import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import MainLayout from '../components/MainLayout'
import { ReactElement } from 'react'
import '../styles/globals.css'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export type MyNextPage<P = {}, IP = P> = NextPage<P, IP> & {
    layout?: (page: ReactElement<P>) => ReactElement
}

type ComponentProps = AppProps & {
    Component?: MyNextPage
}

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: ComponentProps) {
    const getLayout = Component.layout || ((page: ReactElement) => <MainLayout>{page}</MainLayout>)

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <meta name="theme-color" content="#111827" />
                <title>FinanciApp</title>

                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/favicon-16x16.png" type="image/png" sizes="16x16" />
                <link rel="icon" href="/icons/favicon-32x32.png" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"></link>
            </Head>

            <QueryClientProvider client={queryClient}>
                {getLayout(<Component {...pageProps} />)}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    )
}
