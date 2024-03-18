import { cx } from 'class-variance-authority';

import { Button } from '../../../lib/ui/components/Button';

import FileInput from './component/FileInput';
import ProgressBar from './component/ProgressBar';
import useFormImport from './hooks/useFormImport';

import FormLayout from '../FormLayout';

export default function FormImport() {
  const {
    progress,

    file,
    totalUsers,

    handleInputChange,
    handleRemoveFile,
    handleSubmit,
  } = useFormImport();

  return (
    <FormLayout onSubmit={handleSubmit}>
      <FormLayout.Body>
        <FormLayout.Header
          title="Create Segment"
          subtitle="Enter the new segment information"
        />
        <p>
          The CSV should have{' '}
          <span className="font-mono text-emerald-700">user_id</span> and{' '}
          <span className="font-mono text-emerald-700">username</span> column
        </p>
        <fieldset className="flex flex-col gap-1">
          <FileInput
            name="userlist"
            id="userlist"
            accept=".csv"
            placeholder={
              !file ? 'Click here to upload' : 'Click here to change the file'
            }
            onChange={handleInputChange}
          />
        </fieldset>

        <div
          className={cx([
            'transition-opacity duration-500',
            'rounded p-2',
            'flex items-center gap-2',
            'border',
            file ? 'opacity-100' : 'opacity-0',
          ])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>

          <div className="border-x px-2 w-full">
            <p>Total: {totalUsers} Users</p>
            <p className="text-xs text-gray-600 min-h-8">{file?.name}</p>
          </div>
          <button onClick={handleRemoveFile} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
        {progress > 0 ? <ProgressBar progress={progress} /> : null}
      </FormLayout.Body>
      <FormLayout.Footer>
        <Button
          intent="solid"
          className="w-full"
          disabled={!file || progress > 0}
        >
          Submit
        </Button>
      </FormLayout.Footer>
    </FormLayout>
  );
}
