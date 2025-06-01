export function appendAgentParams(path) {
  if (typeof window === "undefined") return path;

  const currentParams = new URLSearchParams(window.location.search);
  const agentRef = currentParams.get("agentRef");
  const agentCup = currentParams.get("agentCup");

  if (!agentRef && !agentCup) return path;

  const newParams = new URLSearchParams();
  if (agentRef) newParams.set("agentRef", agentRef);
  if (agentCup) newParams.set("agentCup", agentCup);

  const hasParams = path.includes("?");
  const separator = hasParams ? "&" : "?";

  return `${path}${separator}${newParams.toString()}`;
}
