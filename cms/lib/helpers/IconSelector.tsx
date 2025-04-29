import { Plus, PlusCircle, Settings, Trash2 } from "lucide-react";

export function useIconSelector (icon: string) {

    switch (icon) {
        case "plus":
            return <Plus className="h-4 w-4" />;
        case "plus-circle":
            return <PlusCircle className="h-4 w-4" />;
        case "trash":
            return <Trash2 className="h-4 w-4" />;
        case "settings":
            return <Settings className="h-4 w-4" />;
        default:
            return null;
    }
}
