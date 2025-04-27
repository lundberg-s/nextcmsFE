"use client";

import React, { useState, useRef } from "react";
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
import { ConfirmationModal } from "./ConfirmationModal";

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
  showFooter?: boolean;
  showDelete?: boolean;
  cancelLabel?: string;
  submitLabel?: string;
}

export function DialogModal({
  title,
  description,
  content: Content,
  button,
  props,
  showFooter = true,
  showDelete = false,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  ...rest
}: DialogModalProps) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formActions = useRef({
    submit: () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    },
    cancel: () => {
      if (formRef.current) {
        formRef.current.reset();
      }
    },
  });

  const contentProps = {
    ...props,
    formRef,
    onSubmitCallback: (...args: any[]) => {
      if (props?.onSubmitCallback) {
        props.onSubmitCallback(...args);
      }
      setOpen(false);
    },
    onCancelCallback: () => {
      if (props?.onCancelCallback) {
        props.onCancelCallback();
      }
      setOpen(false);
    },
    onClose: () => setOpen(false),
    ...rest,
  };

  const iconElement = useIconSelector(button?.icon || "");
  const trashIcon = useIconSelector("trash");
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

          {showFooter && (
            <DialogFooter>
            {showDelete && (
              <ConfirmationModal
                onConfirm={formActions.current.submit}
                trigger={
                  <Button icon={trashIcon} variant="destructive" type="button">
                    Delete
                  </Button>
                }
              />
            )}
              <Button variant="outline" onClick={formActions.current.cancel}>
                {cancelLabel}
              </Button>
              <Button type="submit" onClick={formActions.current.submit}>
                {submitLabel}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
