import Link from "next/link";
import { Button } from "@/cms/components/ui/button";
import { usePage } from "@/cms/lib/hooks/usePage";
import LoadingView from "../LoadingView";

export default function PageNavigation() {
  const { pages } = usePage();

  return (
    <LoadingView>
    <div className="absolute w-full">
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
        <Link href="/login">
        <Button >
          Login
        </Button>
        </Link>
    </nav>
    </div>
    </LoadingView>
  );
}
