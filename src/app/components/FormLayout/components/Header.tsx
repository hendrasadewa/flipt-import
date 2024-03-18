interface Props {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: Props) {
  return (
    <header>
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </header>
  );
}
