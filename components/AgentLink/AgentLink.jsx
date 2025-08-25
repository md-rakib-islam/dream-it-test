"use client";

import Link from "next/link";
import { useMemo } from "react";

const AgentLink = ({ href, children, ...props }) => {
  const finalHref = useMemo(() => {
    if (typeof window === 'undefined' || href === "#") return href;
    
    const urlParams = new URLSearchParams(window.location.search);
    const agentRef = urlParams.get("agentRef");
    const agentCup = urlParams.get("agentCup");
    
    if (!agentRef && !agentCup) return href;

    const hasParams = href.includes("?");
    const separator = hasParams ? "&" : "?";
    let newPath = href;

    if (agentRef) {
      newPath = `${newPath}${separator}agentRef=${agentRef}`;
      if (agentCup) {
        newPath = `${newPath}&agentCup=${agentCup}`;
      }
    } else if (agentCup) {
      newPath = `${newPath}${separator}agentCup=${agentCup}`;
    }

    return newPath;
  }, [href]);

  return (
    <Link href={finalHref} {...props} prefetch={false}>
      {children}
    </Link>
  );
};

export default AgentLink;
