import { SelectHTMLAttributes } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Select } from '../../../../lib/ui/components/Select';
import { namespaceEndpoints } from '../../../../lib/flipt/endpoints/namespace';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function NamespaceSelect({ ...rest }: Props) {
  const { isLoading, data } = useQuery({
    queryFn: namespaceEndpoints.list,
    queryKey: ['namespace'],
  });

  return (
    <Select {...rest} disabled={isLoading}>
      {data?.namespaces.map(({ key, name }) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </Select>
  );
}
