'use client';

import { useUserStore } from '@/cms/lib/store/user-store';
import { Button } from '@/cms/components/ui/button';
import { useRouter } from 'next/navigation';
import LoadingView from '../LoadingView';

export function AdminNavigation() {
  const { user, logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <LoadingView>
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
    </LoadingView>
  );
}
