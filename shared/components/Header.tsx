import Link from "next/link";
import { Button } from "@/cms/components/ui/button";
import { usePage } from "@/cms/lib/hooks/usePage";
import { DialogModal } from "./modal/DialogModal";
import { LoginForm } from "@/shared/features/auth/LoginForm";
import { Separator } from "@radix-ui/react-select";
import { SelectSeparator } from "@/cms/components/ui/select";
import { useUser } from "../lib/hooks/useUser";

export default function PageNavigation() {
  const { pages } = usePage();
  const { user } = useUser();

  const login = {
    title: "Login",
    description: "Enter your credentials to login",
    icon: "login",
    form: LoginForm,
    button: {
      label: "Login",
      variant: "ghost",
    },
  };

  return (
    <div className="fixed bg-black bg-opacity-30 w-full text-white z-10 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-3">
        <h1 className="text-xl font-bold">
          <Link href="/">
            <span className="text-white">MyApp</span>
          </Link>
        </h1>

        <div className="flex items-center space-x-4">
          <ul className="flex space-x-6 text-md font-normal pr-3">
            {pages?.map((page) => (
              <li key={page.id}>
                <Link href={page.slug}>
                  <span className="text-white">{page.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <SelectSeparator className="w-0.5 h-8 bg-gray-200" />
          {user ? (
            // <span>{user.first_name}</span>
            <Link href="/admin">
              <span className="text-white">Admin</span>
            </Link>
          ) : (
            <DialogModal
              key={login.title}
              title={login.title}
              description={login.description}
              content={login.form}
              button={login.button}
            />
          )}
        </div>
      </nav>
    </div>
  );
}
