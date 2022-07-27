import { useEffect } from "react";
import { useRouter } from "next/router";
export default function useRedirect(where: string) {
    const router = useRouter();
    useEffect(() => {
        router.push(where);
    }
    , [router, where]);
    
}
