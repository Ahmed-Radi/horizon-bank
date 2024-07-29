"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

type Props = {
	type: "sign-in" | "sign-up";
};

const AuthForm = ({ type }: Props) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

	const formSchema = authFormSchema(type);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const {
			firstName,
			lastName,
			address1,
			city,
			state,
			postalCode,
			dateOfBirth,
			ssn,
			email,
			password,
		} = values;
		setIsLoading(true);

		try {
			if (type === "sign-up") {
        // this will make all usr data not optional
        const userData = {
          firstName: firstName!,
          lastName: lastName!,
          address1: address1!,
          city: city!,
          state: state!,
          postalCode: postalCode!,
          dateOfBirth: dateOfBirth!,
          ssn: ssn!,
          email: email,
          password: password,
        }
				const newUser = await signUp(userData);
				setUser(newUser);
			} else if (type === "sign-in") {
				const response = await signIn({
					email: email,
					password: password,
				});

        if(response) router.push('/')
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className='auth-form'>
			<header className='flex flex-col gap-5 md:gap-8'>
				<Link
					href='/'
					className='cursor-pointer flex items-center gap-1'>
					<Image
						src='/icons/logo.svg'
						alt='Logo'
						width={34}
						height={34}
					/>
					<h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
						Horizon
					</h1>
				</Link>
				<div className='flex flex-col gap-1 md:gap-3'>
					<h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
						{user
							? "Link Account"
							: type === "sign-in"
							? "Sign In"
							: "Sign Up"}
					</h1>
					<p className='text-16 font-normal text-gray-600'>
						{user
							? "Link your account to continue"
							: "Please enter your details"}
					</p>
				</div>
			</header>
			{user ? (
				<div className='flex flex-col gap-4'>
          <div className="flex flex-col gap-1">
            <p><span className="text-blue-600">Note:</span> Bank email & password</p>
            <p>
              Username: user_good<br />
              Password: pass_good
            </p>
          </div>
          <PlaidLink user={user} variant="primary" />
        </div>
			) : (
				<>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8'>
							{type === "sign-up" && (
								<>
									<div className='flex gap-4'>
										<CustomInput
											control={form.control}
											type='text'
											name='firstName'
											label='First Name'
											placeholder='Enter your first name'
										/>
										<CustomInput
											control={form.control}
											type='text'
											name='lastName'
											label='Last Name'
											placeholder='Enter your last name'
										/>
									</div>
									<CustomInput
										control={form.control}
										type='text'
										name='address1'
										label='Address'
										placeholder='Enter your address'
									/>
									<CustomInput
										control={form.control}
										type='text'
										name='city'
										label='City'
										placeholder='Enter your city'
									/>
									<div className='flex gap-4'>
										<CustomInput
											control={form.control}
											type='text'
											name='state'
											label='State'
											placeholder='ex: NY'
										/>
										<CustomInput
											control={form.control}
											type='text'
											name='postalCode'
											label='Postal Code'
											placeholder='ex: 1011'
										/>
									</div>
									<div className='flex gap-4'>
										<CustomInput
											control={form.control}
											type='date'
											name='dateOfBirth'
											label='Date of Birth'
											placeholder='yyyy-mm-dd'
										/>
										<CustomInput
											control={form.control}
											type='text'
											name='ssn'
											label='SSN'
											placeholder='ex: 1234'
										/>
									</div>
								</>
							)}
							<CustomInput
								control={form.control}
								type='email'
								name='email'
								label='Email'
								placeholder='Enter your email'
							/>
							<CustomInput
								control={form.control}
								type='password'
								name='password'
								label='Password'
								placeholder='Enter your password'
							/>
							<div className='flex flex-col gap-4'>
								<Button
									type='submit'
									className='form-btn'
									disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2
												size={20}
												className='animate-spin'
											/>{" "}
											&nbsp; Loading...
										</>
									) : type === "sign-in" ? (
										"Sign In"
									) : (
										"Sign Up"
									)}
								</Button>
							</div>
						</form>
					</Form>
					<footer className='flex justify-center gap-1'>
						<p className='text-14 font-normal text-gray-600'>
							{type === "sign-in"
								? "Don't have an account?"
								: "Already have an account?"}
						</p>
						<Link
							href={type === "sign-in" ? "/sign-up" : "/sign-in"}
							className='form-link'>
							{type === "sign-in" ? "Sign Up" : "Sign In"}
						</Link>
					</footer>
				</>
			)}
		</section>
	);
};

export default AuthForm;
