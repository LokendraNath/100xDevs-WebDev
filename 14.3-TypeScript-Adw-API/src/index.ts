type EventType = "click" | "scroll" | "mousemove";
type ExcludeEventType = Exclude<EventType, "click">;

const handleEvent = (event: ExcludeEventType) => {
  console.log(`handling event: ${event}`);
};

console.log(handleEvent("scroll"));
