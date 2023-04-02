import useAuth from "@/hooks/useAuth"

export default function Home() {
    const { auth } = useAuth()
    return <h1 className="text-3xl font-bold underline">Hello, {auth?.user?.name}!</h1>
}
