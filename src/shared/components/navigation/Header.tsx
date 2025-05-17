import { api } from "@/shared/lib/api/api";
import Navigation from "./Navigation";

export default async function Header() {
  const pages = await api.pages.get.list();
  return (
    <header>
      <Navigation pages={pages} />
    </header>
  );
}
