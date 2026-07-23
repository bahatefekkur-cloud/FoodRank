interface Props {
  children: React.ReactNode;
}

export default function FilterSidebar({ children }: Props) {
  return (
    <aside className="w-72 shrink-0 rounded-2xl bg-white p-6 shadow-sm h-fit">
      {children}
    </aside>
  );
}