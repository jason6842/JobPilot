'use client';

import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { registerSchema } from '@/features/schemas';

import { signUp } from '@/lib/actions';

import TextSeparator from './TextSeparator';

const SignUpForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const res = await signUp(values);
    console.log('🧪 Server response:', res);

    if (res?.success) {
      router.push('/sign-in');
    } else {
      // optional: show toast or inline error
      console.error(res?.message);
    }
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Enter name" />
                  </FormControl>
                </FormItem>
              )}
            />
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
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <TextSeparator text="OR" />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4"></CardContent>
      <CardContent className="flex items-center justify-center p-7">
        Don&apos;t have an account?
        <Link href="/sign-up">
          <span className="text-blue-700">&nbsp;Sign Up</span>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
