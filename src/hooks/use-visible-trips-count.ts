import { useCallback, useEffect, useRef, useState } from "react";

const ITEMS_PER_PAGE = 3;

export function useVisibleTripsCount(totalItems: number) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + ITEMS_PER_PAGE, totalItems)
    );
  }, [totalItems]);

  useEffect(() => {
    const loader = loaderRef.current;

    if (!loader) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(loader);

    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  return {
    visibleCount,
    loaderRef,
  };
}
