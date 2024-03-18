import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function FileInput({ ...props }: Props) {
  return (
    <label
      htmlFor={props.id}
      className="border flex items-center gap-2 p-2 rounded"
    >
      <img className="h-8 w-8" src="/icons/ic-folder-plus.svg" />
      <span className="border-l px-2">
        {props.value ? props.value : props.placeholder}
      </span>
      <input {...props} type="file" className="hidden" />
    </label>
  );
}
