import { Spinner } from "@/shared/ui/spinner";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <Spinner size="large" />
    </div>
  );
}
