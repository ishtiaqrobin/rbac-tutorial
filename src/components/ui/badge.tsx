import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  cn(
    'inline-flex items-center rounded-xl px-3 py-1 text-xs font-bold font-kalam tracking-wide uppercase border-2 border-black transition-all shadow-[2px_2px_0px_0px_#000]'
  ),
  {
    variants: {
      variant: {
        default: 'bg-[#f3b72b] text-black',
        secondary: 'bg-amber-100 text-black',
        destructive: 'bg-[#e05252] text-white',
        outline: 'bg-white text-black',
        dashed: 'border-2 border-dashed border-black bg-transparent text-black shadow-none font-semibold lowercase tracking-normal',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
