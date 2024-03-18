import { cx } from 'class-variance-authority';

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  const displayedProgress = new Intl.NumberFormat(['id']).format(progress);
  return (
    <div
      id="progress-bar"
      className={cx([
        'w-full px-1',
        'border rounded',
        'bg-emerald-50',
        'text-emerald-800',
        'relative',
      ])}
    >
      <div
        className={cx([
          'bg-emerald-500',
          'absolute top-0 left-0',
          'h-6',
          'opacity-45',
          'transition-all',
        ])}
        style={{
          width: `${displayedProgress}%`,
        }}
      />
      <div className="flex justify-between items-center px-1">
        <p>Uploading...</p>
        <p>{displayedProgress}%</p>
      </div>
    </div>
  );
}
