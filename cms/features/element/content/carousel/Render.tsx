import { Element } from "@/cms/lib/types/blocks";
import {
  Carousel as UICarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/cms/components/ui/carousel";
import { Card } from "@/cms/components/ui/card";
import Image from "next/image";

interface RenderCarouselProps {
  data: Partial<Element>;
}

export function RenderCarousel({ data }: RenderCarouselProps) {
  return (
    <UICarousel className="h-full w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <CarouselContent>
        {data.urls?.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="relative w-full h-[300px] border-0">
              <Image
                src={image || "https://plus.unsplash.com/premium_photo-1681488408867-66ffd3c8339d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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
    </UICarousel>
  );
}