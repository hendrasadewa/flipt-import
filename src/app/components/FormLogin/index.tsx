import { FormEvent, useState } from 'react';

import { Button } from '../../../lib/ui/components/Button';
import { Input } from '../../../lib/ui/components/Input';
import { useAuthStore } from '../../store/useAuthStore';
import { useApplicationStore } from '../../store/useApplicationStore';

import FormLayout from '../FormLayout';

interface FormElements extends HTMLFormControlsCollection {
  host: HTMLInputElement;
  token: HTMLInputElement;
}

interface TokenFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function FormLogin() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const forward = useApplicationStore((s) => s.forward);

  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: FormEvent<TokenFormElement>) => {
    e.preventDefault();
    const { host, token } = e.currentTarget.elements;

    setLoading(true);
    await login(token.value, host.value);
    setLoading(false);
    forward();
  };

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormLayout.Body>
        <FormLayout.Header
          title="Login"
          subtitle="Use your token to continue the operation"
        />
        <div className="space-y-2">
          <fieldset className="flex flex-col gap-1">
            <label htmlFor="host">Host</label>
            <Input
              id="host"
              name="host"
              placeholder="example: https://flipt.yourinstance.com"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-1">
            <label htmlFor="token">Flipt Token</label>
            <Input
              id="token"
              name="token"
              type="password"
              placeholder="Insert your Flipt token here"
            />
          </fieldset>
        </div>
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button intent="solid" disabled={isLoading} className="w-full">
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </FormLayout.Footer>
    </FormLayout>
  );
}
