'use client';

import { useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import GithubSignIn from '@/components/ui/github-sign-in';
import GoogleSignIn from '@/components/ui/google-sign-in';
import { Input } from '@/components/ui/input';

import { loginSchema } from '@/features/schemas';

import TextSeparator from './TextSeparator';

const SignInForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res = await signIn('credentials', {
      ...values,
      redirect: true,
      callbackUrl: '/',
    });

    console.log('🔍 Login result:', res);
  };

  return (
    <Card className="w-full h-full md:w-[487px]">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter email address" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Enter password" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <TextSeparator text="Or continue with" />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <GoogleSignIn />
        <GithubSignIn />
      </CardContent>
      <CardContent className="flex items-center justify-center p-7">
        Don&apos;t have an account?
        <Link href="/sign-up">
          <span className="text-blue-700">&nbsp;Sign Up</span>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
