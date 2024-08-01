import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/tailwind";
import { SelectSingleEventHandler } from "react-day-picker";
import { useState } from "react";

interface Props {
  onChange: SelectSingleEventHandler;
  value: Date;
  placeholder: string;
  dataCy?: string;
}

export function DateInput({ placeholder, value, onChange, dataCy }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          data-cy={dataCy}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(day, selectedDay, activeModifiers, e) => {
            onChange(day, selectedDay, activeModifiers, e);
            setIsCalendarOpen(false);
          }}
          initialFocus
          disabled={[
            {
              before: new Date(),
            },
          ]}
        />
      </PopoverContent>
    </Popover>
  );
}
