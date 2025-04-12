import { usePage } from "@/lib/hooks/usePage";
import { useCmsContext } from "@/lib/context/CmsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Page } from "@/lib/types/page";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";

interface EditPageFormProps {
  page: Page | null;
  onClose: () => void;
}

export function EditPageForm({ onClose }: EditPageFormProps) {
  const { selectedPage, setSelectedPage } = useCmsContext();
  const { updatePage, removePage } = usePage();
  const { register, handleSubmit, reset, setValue, watch } = useForm<Page>({
    defaultValues: {},
  });

  const page = selectedPage;

  useEffect(() => {
    if (page) {
      reset(page);
    }
  }, [page, reset]);

  const onSubmit = (data: Page) => {
    if (page) {
      updatePage(page.id, data);
      onClose();
    }
  };

  const onDelete = () => {
    if (page) {
      removePage(page.id);
      setSelectedPage(null);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <Input id="title" type="text" {...register("title")} />
        </div>
        <div className="border rounded-lg p-4">
          <label htmlFor="slug" className="block text-sm font-medium">
            slug
          </label>
          <Textarea id="slug" {...register("slug")} />
        </div>
      </div>

      <div className="flex justify-between">
        <ConfirmationModal
          onConfirm={onDelete}
          title="Delete Page"
          description="Are you sure you want to delete this page? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          trigger={
            <Button className="flex gap-2" type="button" variant="destructive">
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
          }
        />
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
