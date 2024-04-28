export function setIsExpanded(
  name: string,
  currState: boolean
) {
  localStorage.setItem(name, `${!currState}`);
}

export function getIsExpanded(name: string) {
  return localStorage.getItem(name);
}
