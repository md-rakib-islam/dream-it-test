"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const AgentLink = ({ href, children, ...props }) => {
  const [agentRef, setAgentRef] = useState(null);
  const [agentCup, setAgentCup] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setAgentRef(urlParams.get("agentRef"));
    setAgentCup(urlParams.get("agentCup"));
  }, []);

  const getPathWithParams = (path) => {
    if ((!agentRef && !agentCup) || path === "#") return path;

    const hasParams = path.includes("?");
    const separator = hasParams ? "&" : "?";
    let newPath = path;

    // Add agentRef if it exists
    if (agentRef) {
      newPath = `${newPath}${separator}agentRef=${agentRef}`;
      // If we've added agentRef, any subsequent params need to use & instead of ?
      if (agentCup) {
        newPath = `${newPath}&agentCup=${agentCup}`;
      }
    }
    // If only agentCup exists (no agentRef)
    else if (agentCup) {
      newPath = `${newPath}${separator}agentCup=${agentCup}`;
    }

    return newPath;
  };

  return (
    <Link href={getPathWithParams(href)} {...props}>
      {children}
    </Link>
  );
};

export default AgentLink;
