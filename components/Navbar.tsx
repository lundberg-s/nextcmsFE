'use client';

import { useUserStore } from '@/lib/store/user-store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-semibold">CMS</div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.name}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
