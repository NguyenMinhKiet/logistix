export const SideNavButton = ({
    icon: Icon,
    children,
    onClick,
    loading,
}: {
    icon: React.ElementType;
    children: React.ReactNode;
    onClick?: () => void;
    loading?: boolean;
}) => (
    <button
        onClick={onClick}
        className="cursor-pointer flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
    >
        <Icon className="w-6" />
        <span className="hidden md:inline">{loading ? `${children} ...` : children}</span>
    </button>
);
