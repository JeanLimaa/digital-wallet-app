import { Input } from '@/components/ui/input';
import { NumericFormat } from 'react-number-format';

interface CurrencyInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
}

export function CurrencyInput({ value, setValue, placeholder }: CurrencyInputProps) {
    return (
        <NumericFormat
            customInput={Input}
            value={value}
            onValueChange={(values) => setValue(values.value)}
            placeholder={placeholder}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            allowNegative={false}
            prefix="R$ "
        />
    );
}