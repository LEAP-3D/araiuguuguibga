'use client';
import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DateProps = {
  value: string;
  onChange: (date: string) => void;
};

export function VaccineDate({ value, onChange }: DateProps) {
  const [open, setOpen] = React.useState(false);

  // Convert string to Date object for the calendar
  const date = value ? new Date(value) : undefined;

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-48 justify-between font-normal">
            {date ? date.toLocaleDateString() : 'Огноо сонгох'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate: Date | undefined) => {
              if (selectedDate) {
                // Convert Date to string in YYYY-MM-DD format
                onChange(selectedDate.toISOString().split('T')[0]);
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
