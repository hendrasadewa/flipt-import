import { FormEvent } from 'react';

import { Select } from '../../../lib/ui/components/Select';
import { Button } from '../../../lib/ui/components/Button';
import { Input } from '../../../lib/ui/components/Input';
import { MatchTypesEnum } from '../../../lib/flipt/types/enums';
import { useFormValues } from '../../store/useFormValues';
import { useApplicationStore } from '../../store/useApplicationStore';
import FormLayout from '../FormLayout';
import { toast } from 'sonner';

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  matchType: HTMLSelectElement;
}

interface SegmentFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function FormSegment() {
  const storeSegment = useFormValues((s) => s.storeSegment);
  const forward = useApplicationStore((s) => s.forward);

  const handleSubmit = (e: FormEvent<SegmentFormElement>) => {
    e.preventDefault();
    const { name, description, matchType } = e.currentTarget.elements;
    if (!name.value) {
      toast.error('Segment name cannot be empty');
      return;
    }

    storeSegment(
      name.value,
      description.value,
      matchType.value as MatchTypesEnum
    );
    forward();
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormLayout.Body>
        <FormLayout.Header
          title="Create Segment"
          subtitle="Enter the new segment information"
        />
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="namespace">Name</label>
          <Input name="name" />
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="flag">Description</label>
          <Input name="description" />
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="matchType">Match Type</label>
          <Select
            defaultValue={MatchTypesEnum.ANY}
            name="matchType"
            id="matchType"
          >
            <option value={MatchTypesEnum.ANY}>Match Any</option>
            <option value={MatchTypesEnum.ALL}>Match All</option>
          </Select>
        </fieldset>
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button intent="solid" className="w-full">
          Submit
        </Button>
      </FormLayout.Footer>
    </FormLayout>
  );
}
