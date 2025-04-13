import { usePage } from "@/lib/hooks/usePage";

export default function LoadingView ({ children }: { children: React.ReactNode }) {
    const { isLoadingPages } = usePage();

    if (isLoadingPages) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}