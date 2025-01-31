import { AdminNavigation } from '@/components/navigation/AdminNavigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNavigation />
      <div className="container-fluid">
        {children}
      </div>
    </div>
  );
}
