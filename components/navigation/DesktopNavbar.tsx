import Link from "next/link";
import { useAdminStore } from "@/lib/store/admin-store";

export default function DesktopNavbar() {
  const { pages } = useAdminStore();

  return (
    <nav className="p-4 w-full">
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-xl font-bold text-gray-800 absolute left-10">MyApp</h1>
        <ul className="flex space-x-6 underline text-xl font-bold">
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={page.slug}>
                  {page.title}

              </ Link>

            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
