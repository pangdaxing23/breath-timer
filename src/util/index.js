export function* toggle() {
  while (true) {
    yield true;
    yield false;
  }
}

export const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
