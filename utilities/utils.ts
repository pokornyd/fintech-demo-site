export const stripPTags = (html: string) => {
  return html.replace(/^< *p *>/g, '').replace(/< *[/]p *> *$/g, '');
};

export const getProjectIdFromQuery = (query: Record<string, string | string[] | undefined>): string => {
  return (query.projectid || '07a0e6e2-7522-0168-4abe-96ca54ee68e3') as string;
};

export const getCodenameFromQuery = (query: Record<string, string | string[] | undefined>): string => {
  return (query.name) as string;
};

export const addPersistentProjId = (query: Record<string, string | string[] | undefined>): string => {
  return query && query.projectid ? "?projectid=" + query.projectid : "";
};

export const addDetailQueryString = (query: Record<string, string | string[] | undefined>): string => {
  return query && query.projectid ? "&name=" : "?name=";
};

export const addClassToPTags = (html: string, className: string) => {
  const replacement = `<p class="${className}">`;
  return html.replace(/< *p *>/g, replacement);
};

function getParent(element: Element | null | Text, parentCondition: (parentElement: Element) => boolean): Element | null {
  if (!(element instanceof HTMLElement)) {
    return null;
  }

  let parentElement: Element | null = element;

  while (parentElement.parentElement) {
    parentElement = parentElement.parentElement;

    if (parentElement.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    if (parentElement.nodeName === 'BODY') {
      return null;
    }

    if (parentCondition(parentElement)) {
      return parentElement;
    }
  }

  return null;
}

function isPositionReference(parentElement: Element): boolean {
  let style: CSSStyleDeclaration | null | undefined;

  try {
    style = window.getComputedStyle(parentElement);
  }
  catch (err) {
    console.error(err);
  }

  if (!style) {
    return true;
  }
  return ['relative', 'absolute', 'fixed'].includes(style.position as any);
}

export function getPositionReferenceParent(element: Element | null | Text): Element {
  return getParent(element, isPositionReference) || document.body;
}
