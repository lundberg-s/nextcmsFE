'use client';

import { useRouter } from 'next/navigation';
import { getIcon } from '@/cms/lib/utilities/GetIcon';

export function AdminNavigation() {

  const MenuIcon = getIcon('chevron-down');

  return (
    <nav className="fixed z-10 top-0 left-1/2 transform -translate-x-1/2 px-20 bg-white bg-opacity-70 backdrop-blur-sm rounded-b-lg">
      <div className="flex items-center p-2 gap-2">
        <span className="text-sm font-semibold	text-black">
          Moderator: User not found
        </span>

        <div>
          {MenuIcon}
        </div>
      </div>

    </nav>
  );
}