import { useState, useRef, useEffect, useCallback } from 'react';

const CARD_GAP = 24;

interface UseOpportunityCarouselOptions {
  totalItems: number;
  itemsPerPage?: number;
}

export function useOpportunityCarousel({
  totalItems,
  itemsPerPage = 2,
}: UseOpportunityCarouselOptions) {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getScrollPerPage = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 320 * 2 + CARD_GAP; // fallback
    const { scrollWidth } = el;
    const cardWidth = (scrollWidth - (totalItems - 1) * CARD_GAP) / totalItems;
    return (cardWidth + CARD_GAP) * itemsPerPage;
  }, [totalItems, itemsPerPage]);

  const updateActivePage = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const scrollPerPage = getScrollPerPage();
    const page = Math.round(scrollLeft / scrollPerPage);
    setActivePageIndex(Math.min(Math.max(0, page), totalPages - 1));
  }, [totalPages, getScrollPerPage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateActivePage();
    el.addEventListener('scroll', updateActivePage);
    window.addEventListener('resize', updateActivePage);
    return () => {
      el.removeEventListener('scroll', updateActivePage);
      window.removeEventListener('resize', updateActivePage);
    };
  }, [updateActivePage]);

  const scrollToPage = useCallback(
    (pageIndex: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const scrollPerPage = getScrollPerPage();
      const targetScroll = pageIndex * scrollPerPage;
      el.scrollTo({ left: targetScroll, behavior: 'smooth' });
    },
    [getScrollPerPage]
  );

  const goToNextPage = useCallback(() => {
    const next = Math.min(totalPages - 1, activePageIndex + 1);
    scrollToPage(next);
  }, [activePageIndex, totalPages, scrollToPage]);

  const goToPrevPage = useCallback(() => {
    const prev = Math.max(0, activePageIndex - 1);
    scrollToPage(prev);
  }, [activePageIndex, scrollToPage]);

  return {
    scrollRef,
    activePageIndex,
    totalPages,
    scrollToPage,
    goToNextPage,
    goToPrevPage,
  };
}
