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
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
