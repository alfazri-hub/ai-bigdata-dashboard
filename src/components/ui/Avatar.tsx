import React from 'react';

export default function Avatar({ initials, color, border = "border-white" }: { initials: string; color: string; border?: string }) {
  return (
    <div className={`w-8 h-8 rounded-full border-2 ${border} ${color} flex items-center justify-center text-xs font-bold text-white z-10 relative shadow-sm`}>
      {initials}
    </div>
  );
}