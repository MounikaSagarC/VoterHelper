import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  OptionType,
} from "@/components/ui/combobox";

// For clarity, define a type for the country data that includes searchValue
type Option = {
  label: string;
  value: string;
};

interface combobxOptionsProps {
  options: Option[];
  value: OptionType | null;
  onChange: (value: OptionType | null) => void;
  placeholder?: string;
  emptyText?: string;
  className?: string;
  contentClassName?: string;
  itemClassssName?: string;
}

export function ComboboxSearch({
  options,
  value,
  onChange,
  className,
  placeholder,
}: combobxOptionsProps) {
  return (
    <Combobox value={value} onValueChange={onChange}>
      <ComboboxTrigger
        style={{height:40}}
        className={`
          ${className}
          px-3 mt-2
          w-full
          border-0 border-gray-300
          rounded-lg
          bg-white
          text-sm
          focus:ring-2 focus:ring-blue-500
        `}
      >
        <ComboboxValue
          placeholder={placeholder || "Select option"}
          style={{fontSize:15}}
        />
      </ComboboxTrigger>

      <ComboboxContent className="bg-gray-200 max-h-32 overflow-auto rounded-sm shadow-md">
        <ComboboxList className="text-sm">
          {options.map((option) => (
            <ComboboxItem
              key={option.value}
              value={option.value}
              className="m-0 py-1 px-2 rounded-md !text-sm"
            >
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
