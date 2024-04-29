export function setIsExpanded(
  name: string,
  currState: boolean
) {
  localStorage.setItem(name, `${!currState}`);
}

export function getIsExpanded(name: string) {
  return localStorage.getItem(name);
}

export function setView(id: string, currView: string) {
  localStorage.setItem(id, currView);
}

export function getView(id: string) {
  return localStorage.getItem(id);
}
