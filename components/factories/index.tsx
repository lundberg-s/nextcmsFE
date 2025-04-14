import { Button } from "../../features/block-content/components/button/Edit";
import { Input } from "../../features/block-content/components/input/Render";
import { Description } from "../../features/block-content/components/description/Edit";
import { Title } from "../../features/block-content/components/title/Edit";
import { Separator } from "../../features/block-content/components/separator/Edit";
import { Card } from "../../features/block-content/components/card/Edit";
import { Carousel } from "../../features/block-content/components/carousel/Edit";
import { BackgroundColor } from "../../features/block-content/settings/BackgroundColor";
import { BackgroundImage } from "../../features/block-content/settings/BackgroundImage";
import { ContainerLayout } from "../../features/block-content/settings/ContainerLayout";
import { TextColor } from "../../features/block-content/settings/TextColor";


export const CMS = {
  Button,
  Input,
  Description,
  Title,
  Separator,
  Card,
  Carousel,
  BackgroundColor,
  BackgroundImage,
  ContainerLayout,
  TextColor,
} as const;



