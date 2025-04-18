import * as buttonComponents from './button';
import * as titleComponents from './title';
import * as cardComponents from './card';
import * as carouselComponents from './carousel';
import * as descriptionComponents from './description';
import * as inputComponents from './input';
import * as separatorComponents from './separator';

export const Edit = {
  ...buttonComponents.Edit,
  ...titleComponents.Edit,
  ...separatorComponents.Edit,
  ...cardComponents.Edit,
  ...carouselComponents.Edit,
  ...descriptionComponents.Edit,
  ...inputComponents.Edit,
};

export const Render = {
  ...buttonComponents.Render,
  ...titleComponents.Render,
  ...separatorComponents.Render,
  ...cardComponents.Render,
  ...carouselComponents.Render,
  ...descriptionComponents.Render,
  ...inputComponents.Render,
};

export const Preview = {
  ...buttonComponents.Preview,
  ...titleComponents.Preview,
  ...separatorComponents.Preview,
  ...cardComponents.Preview,
  ...carouselComponents.Preview,
  ...descriptionComponents.Preview,
  ...inputComponents.Preview,
};