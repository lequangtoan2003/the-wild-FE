"use client"

import { useFormStatus } from "react-dom";

export default function Button ({children, pendingLabel} : {children : string, pendingLabel: string}) {
    const { pending } = useFormStatus();
    return (
        
        <button disabled={pending} className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled= disabled:bg-gray-500 disabled:text-gray-300">
            {pending ? pendingLabel : children}
          </button>
    )
}