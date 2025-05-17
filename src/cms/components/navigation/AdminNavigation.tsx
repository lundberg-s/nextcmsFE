"use client";

import { getIcon } from "@/cms/lib/utilities/GetIcon";
import { useAuth } from "@/shared/lib/hooks/useAuth";
import { useUser } from "@/shared/lib/hooks/useUser";

export function AdminNavigation() {

  const MenuIcon = getIcon("chevron-down");
  const { logout } = useAuth();
  const { user } = useUser();

  return (
    <nav className="fixed z-10 top-0 left-1/2 transform -translate-x-1/2 px-10 bg-white bg-opacity-70 backdrop-blur-sm rounded-b-lg">
      <div className="flex items-center p-2 gap-10">
        <span className="text-sm font-semibold	text-black">
          Moderator: {user?.first_name}
        </span>

        {/* <div>{MenuIcon}</div> */}
        <button onClick={() => logout()}>Logout</button>
      </div>
    </nav>
  );
}
