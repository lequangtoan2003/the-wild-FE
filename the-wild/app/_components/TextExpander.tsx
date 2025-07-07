"use client";

import { useState } from "react";

export default function TextExpander({children}: {children: string}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayText = isExpanded ? children : children.split(" ").slice(0, 30).join(" ") + "...";
    return( 
        <div className="">
            {displayText} {""} 
            <button className="text-blue-500 hover:underline" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Show less' : 'Show more'}
            </button>
        </div>
    )
}
