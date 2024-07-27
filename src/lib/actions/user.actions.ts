"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async (userData: signInProps) => {
	const { email, password } = userData;
	try {
		const { account } = await createAdminClient();

		const response = await account.createEmailPasswordSession(
			email,
			password
		);

		// we use parseStringify because Next SSR can't to send objects from server action to the frontend
		return parseStringify(response);
	} catch (error) {
		console.error("sign-in error", error);
	}
};

export const signUp = async (userData: SignUpParams) => {
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
	} = userData;
	try {
		const { account } = await createAdminClient();

		const newUserAccount = await account.create(
			ID.unique(),
			email,
			password,
			`${firstName} ${lastName}`
		);
		const session = await account.createEmailPasswordSession(
			email,
			password
		);

		cookies().set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		// we use parseStringify because Next SSR can't to send objects from server action to the frontend
		return parseStringify(newUserAccount);
	} catch (error) {
		console.error("sign-in error", error);
	}
};

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		const user = await account.get();
		return parseStringify(user);
	} catch (error) {
		return null;
	}
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete('appwrite-session')
    await account.deleteSession('current')
  } catch (error) {
    console.error('Error', error)
  }
}