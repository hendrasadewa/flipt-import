import { useEffect } from 'react';
import { cx } from 'class-variance-authority';

import { useFormValues } from '../../store/useFormValues';
import { useAuthStore } from '../../store/useAuthStore';
import { useApplicationStore } from '../../store/useApplicationStore';
import { ApplicationSteps } from '../../constants/enums';

export default function SuccessPage() {
  const segment = useFormValues((s) => s.segment);
  const logout = useAuthStore((s) => s.logout);
  const clearForm = useFormValues((s) => s.clearForm);
  const flag = useFormValues((s) => s.flag);
  const setStep = useApplicationStore((s) => s.setStep);

  useEffect(() => {
    logout();
    clearForm();

    const timeout = setTimeout(() => {
      setStep(ApplicationSteps.LOGIN);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [clearForm, logout, setStep]);

  return (
    <div
      className={cx([
        'flex flex-col items-center justify-center gap-4',
        'px-6 m-auto',
        'max-w-screen-sm',
      ])}
    >
      <img
        src="/icons/il-happy.svg"
        className="object-center max-w-72 m-auto"
      />
      <h1 className="text-xl font-bold text-start">Congratulations</h1>
      <p className="text-center">
        You have successfully added{' '}
        <span className="underline">{segment?.name}</span> to the{' '}
        <span className="underline">{flag}</span> feature, and it will enabled
        to the public.
      </p>
      <p>Now, we're redirecting you back to the login page....</p>
    </div>
  );
}
