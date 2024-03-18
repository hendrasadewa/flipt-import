import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../lib/ui/components/Button';

import FormLayout from '../FormLayout';

import NamespaceSelect from './components/NamespaceSelect';
import FlagSelect from './components/FlagSelect';
import { useFormValues } from '../../store/useFormValues';
import { useApplicationStore } from '../../store/useApplicationStore';

interface FormElements extends HTMLFormControlsCollection {
  namespace: HTMLSelectElement;
}

interface NamespaceFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function FormNamespace() {
  const forward = useApplicationStore((s) => s.forward);

  const storeFlag = useFormValues((s) => s.storeFlag);
  const [namespace, setNamespace] = useState<string>();
  const [flag, setFlag] = useState<string>();

  const handleSubmit = (e: FormEvent<NamespaceFormElement>) => {
    e.preventDefault();
    storeFlag(namespace, flag);
    forward();
  };

  const handleNamespaceChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setNamespace(e.target.value);
  };

  const handleFlagChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    setFlag(e.target.value);
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormLayout.Body>
        <FormLayout.Header
          title="Choose Feature Flags"
          subtitle="Select your target namespace, and features"
        />
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="namespace">Namespace</label>
          <NamespaceSelect
            id="namespace"
            name="namespace"
            value={namespace}
            onChange={handleNamespaceChanged}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-1">
          <label htmlFor="flag">Flag</label>
          <FlagSelect
            id="flag"
            name="flag"
            namespace={namespace}
            value={flag}
            onChange={handleFlagChanged}
          />
        </fieldset>
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button
          intent="solid"
          disabled={!namespace || !flag}
          className="w-full"
        >
          Submit
        </Button>
      </FormLayout.Footer>
    </FormLayout>
  );
}
