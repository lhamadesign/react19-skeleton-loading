import { useLayoutEffect, useRef, useState } from "react";

function getLastVisibleItem2(div: HTMLElement | null) {
  for (let a = 0; a < 999999999; a++) {
    continue;
  }
  if (!div) return -1;
  const gap = 8; // or from your styles
  const children = [...div.children];
  if (children.length === 0) return -1;
  const divWidth = div.getBoundingClientRect().width;
  const moreButtonWidth =
    children[children.length - 1].getBoundingClientRect().width;

  const availableWidth = divWidth - moreButtonWidth - gap; // reserve space for "more" button and its gap
  let total = 0;
  let lastIndex = -1;

  // Only iterate up to the link before the "more" button
  for (let i = 0; i < children.length - 2; ++i) {
    const width = children[i].getBoundingClientRect().width;
    if (i > 0) total += gap;
    total += width;
    if (total > availableWidth) break;
    lastIndex = i;
  }
  return lastIndex;
}

export default function NavLinks({ links }: { links: string[] }) {
  const navsRef = useRef(null);
  const [lastVisibleMenuItem, setLastVisibleMenuItem] = useState<number>(-1);

  useLayoutEffect(() => {
    console.log("repainting...");
    const mdiv = navsRef.current;
    if (mdiv) {
      const itemIndex = getLastVisibleItem2(mdiv);
      setLastVisibleMenuItem(itemIndex);
    }
  }, [navsRef]);

  /* useEffect(() => {
      const mdiv = navsRef.current;
      if (mdiv) {
        const itemIndex = getLastVisibleItem2(mdiv);
        setLastVisibleMenuItem(itemIndex);
      }
    }, [navsRef]); */

  if (lastVisibleMenuItem === -1) {
    return (
      <div
        id="links"
        ref={navsRef}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "4px",
          maxWidth: "100%",
          justifyContent: "center",
        }}
      >
        {links.map((link: string) => {
          return (
            <div
              key={link}
              className="link"
              style={{
                padding: "6px 8px",
                border: "solid 1px black",
                textWrap: "nowrap",
              }}
            >
              {link}
            </div>
          );
        })}
        <button
          type="button"
          id="more"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "6px 10px",
            borderRadius: "2px",
          }}
        >
          ...
        </button>
      </div>
    );
  }

  const isMoreVisible = lastVisibleMenuItem < links.length - 1;
  const filteredLinks = links.filter(
    (item: string, index: number) => index <= lastVisibleMenuItem && item !== ""
  );

  return (
    <div
      id="links"
      ref={navsRef}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: "8px",
        maxWidth: "100%",
        justifyContent: "center",
      }}
    >
      {filteredLinks.map((link: string) => {
        return (
          <div
            key={link}
            className="link"
            style={{
              padding: "6px 8px",
              border: "solid 1px black",
              textWrap: "nowrap",
            }}
          >
            {link}
          </div>
        );
      })}
      {isMoreVisible && (
        <button
          type="button"
          id="more"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "6px 10px",
            borderRadius: "2px",
          }}
        >
          ...
        </button>
      )}
    </div>
  );
}
