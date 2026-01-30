'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NetflixCard from './NetflixCard';

interface RowProps {
  title: string;
  items: any[];
}

export default function NetflixRow({ title, items }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-fit space-y-2 md:space-y-4 my-8 pl-4 md:pl-12 group">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      
      <div className="relative md:-ml-2">
        {/* Left Arrow */}
        <div 
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-full w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        >
          <div className="flex h-full items-center justify-center bg-black/30 hover:bg-black/60 rounded-r-md">
             <ChevronLeft className="h-9 w-9 text-white" />
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={rowRef}
          className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 md:p-2"
        >
          {items.map((item) => (
             <NetflixCard key={item.id} item={item} />
          ))}
        </div>

        {/* Right Arrow */}
        <div 
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-full w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        >
          <div className="flex h-full items-center justify-center bg-black/30 hover:bg-black/60 rounded-l-md">
             <ChevronRight className="h-9 w-9 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}