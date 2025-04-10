"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useIconSelector } from "@/lib/helpers/IconSelector";

interface DialogModalProps {
  title: string;
  description: string;
  content: React.ComponentType<any>;
  button: {
    label?: string;
    icon?: string;
    variant?: any;
    disabled?: boolean;
  };
  props?: any;
}

export function DialogModal({
  title,
  description,
  content: Content,
  button,
  props,
  ...rest
}: DialogModalProps) {
  const [open, setOpen] = useState(false);

  const contentProps = {
    ...props,
    onCancel: () => setOpen(false),
    onClose: () => setOpen(false),
    onAdd: () => setOpen(false),
    ...rest,
  };

  const iconElement = useIconSelector(button?.icon || "");

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        icon={button?.icon ? iconElement : null}
        variant={button?.variant || "default"}
        disabled={button?.disabled}
      >
        {button?.label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {Content ? <Content {...contentProps} /> : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
