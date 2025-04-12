import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCms } from "@/lib/hooks/useCms";

export default function PageNavigation() {
  const { pages } = useCms();

  return (
    <div className="absolute w-full">
    <nav className="container-fluid flex justify-between items-center p-5">
        {/* <h1 className="text-xl font-bold text-gray-800 left-10">MyApp</h1>
        <ul className="flex space-x-6 text-xl font-bold">
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={page.slug}>
                  {page.title}

              </ Link>

            </li>
          ))}
        </ul> */}
        <Button >
          <Link href="/login">Login</Link>
        </Button>
    </nav>
    </div>
  );
}
