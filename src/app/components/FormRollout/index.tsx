import { useQuery } from '@tanstack/react-query';
import { FormEvent } from 'react';
import { toast } from 'sonner';

import { Button } from '../../../lib/ui/components/Button';
import { rolloutEndpoints } from '../../../lib/flipt/endpoints/rollout';
import { SegmentOperatorEnum } from '../../../lib/flipt/types/enums';
import { useFormValues } from '../../store/useFormValues';
import { useApplicationStore } from '../../store/useApplicationStore';

import FormLayout from '../FormLayout';

export default function FormRollout() {
  const namespace = useFormValues((s) => s.namespace);
  const flag = useFormValues((s) => s.flag);
  const segment = useFormValues((s) => s.segment);
  const forward = useApplicationStore((s) => s.forward);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['rollout'],
    queryFn: () => rolloutEndpoints.list(namespace!, flag!),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!namespace) {
      throw new Error('Namespace is required');
    }

    if (!segment) {
      throw new Error('Segment is required');
    }

    if (!flag) {
      throw new Error('Flag is required');
    }

    if (!data) {
      toast.error('Rollout list must be exitst');
      return;
    }

    await rolloutEndpoints.create(
      namespace,
      flag,
      segment.key,
      SegmentOperatorEnum.OR,
      data.totalCount + 1
    );

    toast.success(
      `Successfully rollout the ${segment.key} to the ${flag} feature`
    );

    forward();
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormLayout.Body>
        <FormLayout.Header
          title="Rollout"
          subtitle="Create rollout to feature to the uploaded segment"
        />
        <div className="border rounded bg-emerald-50 p-2">
          <p>
            Click submit to continue creating rollout, or you can do it later
            from the flipt dashboard
          </p>
        </div>
      </FormLayout.Body>
      <FormLayout.Footer>
        <div className="space-y-2">
          <Button intent="solid" disabled={!isSuccess} className="w-full">
            {isLoading ? 'Submitting...' : 'Create rollout'}
          </Button>
          <Button
            type="button"
            intent="ghost"
            disabled={!isSuccess}
            className="w-full"
            onClick={forward}
          >
            Create rollout later
          </Button>
        </div>
      </FormLayout.Footer>
    </FormLayout>
  );
}
