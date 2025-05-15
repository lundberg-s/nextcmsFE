"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/cms/components/ui/dialog";
import { Button } from "@/cms/components/ui/button";
import { getIcon } from "@/cms/lib/utilities/GetIcon";
import { ConfirmationModal } from "./ConfirmationModal";
import { Trash2 } from "lucide-react";

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
  deleteLabel?: string;
  deleteDescription?: string;
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
  deleteLabel = "Delete",
  deleteDescription = "Are you sure you want to delete this item? This action cannot be undone.",
  ...rest
}: DialogModalProps) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const handleDeleteRef = useRef<(() => void) | null>(null);

  const formActions = {
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
  };

  const setHandleDelete = (fn: () => void) => {
    handleDeleteRef.current = fn;
  };

  const contentProps = {
    ...props,
    formRef,
    setHandleDelete,
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
    onDeleteCallback: () => {
      if (props?.onDeleteCallback) {
        props.onDeleteCallback();
      }
      setOpen(false);
    },
    onClose: () => setOpen(false),
    ...rest,
  };

  const iconElement = getIcon(button?.icon || "");

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
              <div
                className={`flex w-full items-center ${
                  showDelete ? "justify-between" : "justify-end"
                }`}
              >
                {showDelete && (
                  <div className="mr-auto">
                    <ConfirmationModal
                      onConfirm={() => {
                        if (handleDeleteRef.current) {
                          handleDeleteRef.current();
                        }
                      }}
                      title="Delete Confirmation"
                      description={deleteDescription}
                      confirmText={deleteLabel}
                      cancelText={cancelLabel}
                      trigger={
                        <Button
                          type="button"
                          variant="destructive"
                          className="flex gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> {deleteLabel}
                        </Button>
                      }
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={formActions.cancel}>
                    {cancelLabel}
                  </Button>
                  <Button type="submit" onClick={formActions.submit}>
                    {submitLabel}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
