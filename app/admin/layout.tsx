import { Navbar } from '@/components/Navbar';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        {children}
      </div>
    </div>
  );
}
