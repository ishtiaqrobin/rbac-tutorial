import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[100px] w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-base font-medium font-kalam text-[#1a1a1a]',
        'shadow-[2px_2px_0px_0px_#000] transition-all placeholder:text-gray-400 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#f3b72b] focus-visible:shadow-[3px_3px_0px_0px_#000]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
