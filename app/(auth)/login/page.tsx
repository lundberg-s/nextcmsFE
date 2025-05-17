'use client';

import { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { LoginForm } from '@/shared/features/auth/LoginForm';


export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const formActions = {
    submit: () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    },
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to proceed</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm formRef={formRef} />
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            className="w-full"
            onClick={formActions.submit}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
