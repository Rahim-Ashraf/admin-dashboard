import Menu from "@/components/Menu/Menu";

function layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="px-4 lg:flex justify-between max-w-screen-2xl mx-auto">
            <Menu />
            <div className="lg:w-4/5 p-2">
                {children}
            </div>
        </div>
    )
}

export default layout