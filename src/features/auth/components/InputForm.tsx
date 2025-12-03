import { Input } from '@/components/ui/input';

type InputFormProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
};

export function InputForm({ label, type, name, placeholder }: InputFormProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <Input
        required
        aria-label={label}
        placeholder={placeholder}
        name={name}
        type={type}
        className="mt-1 w-full border rounded-md px-3 py-4"
      />
    </div>
  );
}