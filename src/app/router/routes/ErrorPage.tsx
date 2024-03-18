import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import Screen from '../../components/Screen';
import { cx } from 'class-variance-authority';
import { Button } from '../../../lib/ui/components/Button';

export default function ErrorPage() {
  const error = useRouteError();

  let message = 'unhandled error';
  let status = 500;

  if (isRouteErrorResponse(error)) {
    message = error.data;
    status = error.status;
  }

  if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Screen>
      <Screen.Header>
        <div className="flex items-center gap-2">
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
          <h1 className="font-bold text-xl">Flip Toolkit</h1>
        </div>
      </Screen.Header>
      <Screen.Body>
        <div
          id="error-page"
          className={cx([
            'h-full',
            'flex flex-col items-center justify-center gap-4',
            'm-auto ',
          ])}
        >
          <div className="w-48 h-48">
            <img
              src="/icons/il-towing.svg"
              className="aspect-square border-emerald-500 border-4 rounded-full"
            />
          </div>
          <h1 className="text-4xl text-center">{status}</h1>
          <p>
            <i>{message}</i>
          </p>

          <Link to="/">
            <Button intent="ghost">Click here to back to home</Button>
          </Link>
        </div>
      </Screen.Body>
    </Screen>
  );
}
