/**
 * select.tsx — Shadcn/UI style Select component with Handwritten Doodle Aesthetics
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value: controlledValue, defaultValue, onValueChange, children }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const [open, setOpen] = React.useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = React.useCallback((val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onValueChange) {
      onValueChange(val);
    }
    setOpen(false);
  }, [isControlled, onValueChange]);

  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ value: String(value), onValueChange: handleValueChange, open, setOpen }}>
      <div ref={selectRef} className="relative inline-block w-full min-w-[130px] font-kalam">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectTrigger must be used within Select');

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => context.setOpen((prev) => !prev)}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-xl border-2 border-black bg-white px-3.5 py-1.5 text-sm font-bold text-[#1a1a1a]',
        'shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000]',
        'focus:outline-none focus:ring-2 focus:ring-[#f3b72b] transition-all cursor-pointer font-kalam',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform duration-200', context.open && 'rotate-180')} />
    </button>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

export function SelectValue({ placeholder, children }: { placeholder?: string; children?: React.ReactNode }) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectValue must be used within Select');

  return (
    <span className="truncate font-bold uppercase">
      {children !== undefined ? children : (context.value || placeholder || 'Select option')}
    </span>
  );
}

export function SelectContent({ className, children }: { className?: string; children: React.ReactNode }) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectContent must be used within Select');

  if (!context.open) return null;

  return (
    <div
      className={cn(
        'absolute z-50 mt-1 min-w-[8rem] w-full overflow-hidden rounded-xl border-2 border-black bg-white text-[#1a1a1a]',
        'shadow-[4px_4px_0px_0px_#000] animate-in fade-in-80 font-kalam p-1',
        className
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  );
}

export function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error('SelectItem must be used within Select');

  const isSelected = context.value === String(value);

  return (
    <div
      onClick={() => context.onValueChange(String(value))}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg px-3 py-1.5 text-sm font-bold',
        'hover:bg-[#f3b72b]/30 transition-colors font-kalam',
        isSelected && 'bg-[#f3b72b] text-black shadow-[1px_1px_0px_0px_#000]',
        className
      )}
    >
      <span className="truncate">{children}</span>
      {isSelected && <Check className="h-4 w-4 shrink-0 font-bold text-black" />}
    </div>
  );
}
