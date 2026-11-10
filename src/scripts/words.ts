/** Wraps each word of an element in an inline-block span (keeps <br> and nested tags). */
export function splitWords(el: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  const walk = (node: Node) => {
    for (const n of [...node.childNodes]) {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const part of (n.textContent ?? '').split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
          } else {
            const s = document.createElement('span');
            s.className = 'w';
            s.dataset.word = '';
            s.textContent = part;
            frag.append(s);
            out.push(s);
          }
        }
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && (n as HTMLElement).tagName !== 'BR') {
        walk(n);
      }
    }
  };
  walk(el);
  return out;
}
