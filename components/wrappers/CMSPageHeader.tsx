export function CMSPageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center pb-2">{children}</div>
  );
}
