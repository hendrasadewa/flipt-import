import { Outlet } from 'react-router-dom';

import Screen from '../../components/Screen';
import { useApplicationStore } from '../../store/useApplicationStore';
import { ApplicationSteps } from '../../constants/enums';

export default function Root() {
  const step = useApplicationStore((s) => s.step);
  const back = useApplicationStore((s) => s.back);
  return (
    <Screen>
      <Screen.Header>
        <div className="flex items-center gap-2">
          {step > ApplicationSteps.LOGIN && step < ApplicationSteps.SUCCESS ? (
            <button onClick={back} type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
          )}
          <h1 className="font-bold text-xl">Flip Toolkit</h1>
        </div>
      </Screen.Header>
      <Screen.Body>
        <Outlet />
      </Screen.Body>
    </Screen>
  );
}
