// HorizontallyScrollable.tsx
import React, { useRef, useState, PointerEvent } from 'react';
import clsx from 'clsx';

export interface HorizontallyScrollableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Horizontal scroller that scrolls ONLY when:
 *   • the user drags the scrollbar thumb, or
 *   • the user click-drags inside the container (grab-to-scroll).
 */
const HorizontallyScrollable: React.FC<HorizontallyScrollableProps> = ({
  children,
  className,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  /* ----- grab-scroll state ----- */
  const [isDragging, setDragging] = useState(false);
  const dragStartX   = useRef(0);
  const scrollStartX = useRef(0);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Only left-button / primary touch
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;

    setDragging(true);
    dragStartX.current   = e.clientX;
    scrollStartX.current = el.scrollLeft;
    // lock focus so the pointerup arrives even if you leave the element
    el.setPointerCapture(e.pointerId);
    // visual feedback
    el.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    const dx = e.clientX - dragStartX.current;
    ref.current.scrollLeft = scrollStartX.current - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    setDragging(false);
    ref.current.releasePointerCapture(e.pointerId);
    ref.current.style.cursor = 'grab';
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'hscroll flex gap-4 select-none cursor-grab', // ← added "hscroll"
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      {...rest}
    >
      {children}
    </div>
  );
};

export default HorizontallyScrollable;
