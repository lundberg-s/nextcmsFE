import { Plus, PlusCircle, Settings, Trash2, ChevronDown, ChevronRight } from "lucide-react";

export function getIcon (icon: string) {

    switch (icon) {
        case "plus":
            return <Plus className="h-4 w-4" />;
        case "plus-circle":
            return <PlusCircle className="h-4 w-4" />;
        case "trash":
            return <Trash2 className="h-4 w-4" />;
        case "settings":
            return <Settings className="h-4 w-4" />;
        case "chevron-down":
            return <ChevronDown className="h-4 w-4" />;
        case "chevron-right":
            return <ChevronRight className="h-5 w-5" />;
        default:
            return null;
    }
}
