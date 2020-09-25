function getOffset() {
  const selection = document.getSelection();
  const range = selection?.getRangeAt(0);
  return range?.startOffset;
}

function setOffset(node: Node, offset: number) {
  const range = new Range();
  range.setStart(node, offset);
  range.setEnd(node, offset);
  document.getSelection()?.removeAllRanges();
  document.getSelection()?.addRange(range);
}

export function useCaret() {
  return { getOffset, setOffset };
}
