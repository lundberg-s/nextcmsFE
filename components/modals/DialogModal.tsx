"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useIconSelector } from "@/lib/helpers/IconSelector";
import { DialogClose } from "@radix-ui/react-dialog";

interface DialogModalProps {
  title: string;
  description: string;
  content: React.ElementType<any>;
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
    onSubmit: (...args: any[]) => {
      if (props?.onSubmit) {
        props.onSubmit(...args);
      }
      setOpen(false);
    },
    onCancel: () => setOpen(false),
    onClose: () => setOpen(false),
    onAdd: () => setOpen(false),
    ...rest,
  };

  const iconElement = useIconSelector(button?.icon || "");

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
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
          {/* <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              form={contentProps?.id}
              disabled={props?.disabled}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (props?.onSubmit) {
                  contentProps.onSubmit(contentProps);
                } else {
                  setOpen(false);
                }
              }}
            >
              {props?.submitLabel || "Submit"}
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
