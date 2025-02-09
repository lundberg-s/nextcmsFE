import { BlockComponent, ComponentKind, ComponentType } from "@/types/blocks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ComponentRenderFormProps {
  type: ComponentType;
  component: Partial<BlockComponent>;
  kind: ComponentKind;
}

export function ComponentRenderForm({
  type,
  component,
  kind,
}: ComponentRenderFormProps) {
  const renderComponent = () => {
    switch (type) {
      case "title":
        return (
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {component.title || "Title"}
          </h1>
        );

      case "description":
        return (
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {component.content || "Description"}
          </p>
        );

      case "button":
        return (
          <Button
            variant={component.variant || "default"}
            size={component.size || "default"}
            className={cn("w-fit", component.className)}
          >
            {component.text || "Button"}
          </Button>
        );

      case "input":
        return (
          <Input
            type={component.type || "text"}
            placeholder={component.placeholder || "Input placeholder"}
            className={cn("max-w-sm", component.className)}
          />
        );

      case "desc":
        return (
          <p className="text-sm text-muted-foreground">
            {component.content || component.placeholder || "Description text"}
          </p>
        );

      case "separator":
        return (
          <Separator
            orientation={component.orientation || "horizontal"}
            className={cn(
              component.orientation === "vertical" ? "h-full" : "w-full",
              component.className
            )}
          />
        );

      case "badge":
        return (
          <Badge
            variant={component.variant || "default"}
            className={cn("w-fit", component.className)}
          >
            {component.text || "Badge"}
          </Badge>
        );

      case "card":
        return (
          <Card className={cn("w-full max-w-md", component.className)}>
            {component.title && (
              <CardHeader>
                <CardTitle>{component.title}</CardTitle>
              </CardHeader>
            )}
            {component.content && (
              <CardContent>
                <p>{component.content}</p>
              </CardContent>
            )}
          </Card>
        );
      case "carousel":
        return (
          <>
            <Carousel className="h-full w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <CarouselContent>
                {component.urls?.map((image, index) => (
                  <CarouselItem key={index}>
                     <Card className="relative w-full h-[300px] border-0">
                        <Image
                          src={image ? image : "https://plus.unsplash.com/premium_photo-1681488408867-66ffd3c8339d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1661515407273-76b61fcebbcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                          alt={`Slide ${index + 1}`}
                          fill
                       
                          className="rounded-lg min-h-[200px] max-h-[300px]"
                        />
                      </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </>
        );

      default:
        return null;
    }
  };

  return <>{renderComponent()}</>;
}
