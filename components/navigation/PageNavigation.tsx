"use client";

import Link from "next/link";
import { useAdminStore } from "@/lib/store/admin-store";
import { Button } from "@/components/ui/button";

export default function PageNavigation() {
  const { pages } = useAdminStore();

  return (
    <nav className="container-fluid flex justify-between items-center p-5">
        <h1 className="text-xl font-bold text-gray-800 left-10">MyApp</h1>
        <ul className="flex space-x-6 text-xl font-bold">
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={page.slug}>
                  {page.title}

              </ Link>

            </li>
          ))}
        </ul>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
    </nav>
  );
}
