"use client";

import React from 'react';
import PageNavigation from './PageNavigation';
import { usePathname } from 'next/navigation';

const NavigationWrapper: React.FC = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return !isAdminRoute ? <PageNavigation /> : null;
};

export default NavigationWrapper;