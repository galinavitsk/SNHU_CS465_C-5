import { NavigationBar } from "@/components/NavigationBar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section>
        <NavigationBar />
        {children}</section>
}
