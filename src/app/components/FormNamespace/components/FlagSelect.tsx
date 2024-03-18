import { SelectHTMLAttributes } from 'react';

import { Select } from '../../../../lib/ui/components/Select';
import { useQuery } from '@tanstack/react-query';
import { flagsEndpoints } from '../../../../lib/flipt/endpoints/flags';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  namespace?: string;
}

export default function FlagSelect({ namespace = '', ...rest }: Props) {
  const { isLoading, data } = useQuery({
    queryFn: () => flagsEndpoints.list(namespace),
    queryKey: ['flags', namespace],
  });

  return (
    <Select {...rest} disabled={isLoading || !namespace}>
      {rest.disabled && <option>select namespace first</option>}
      {data?.flags.map(({ key, name }) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </Select>
  );
}
