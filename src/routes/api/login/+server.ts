import { json } from '@sveltejs/kit';

import { PlayerSex, vocationString } from '$lib/players';
import { prisma } from '$lib/server/prisma';
import { hashPassword } from '$lib/server/utils';

import {
	PVP_TYPE,
	SERVER_ADDRESS,
	SERVER_NAME,
	SERVER_PORT,
} from '$env/static/private';

import type { RequestHandler } from './$types';

interface LoginParams {
	type: 'login';
	email: string;
	password: string;
}

interface LoginSession {
	sessionkey: string;
	lastlogintime: string;
	ispremium: boolean;
	premiumuntil: number;
	status: string;
	returnernotification: boolean;
	showrewardnews: boolean;
	isreturner: boolean;
	fpstracking: boolean;
	optiontracking: boolean;
	// tournamentticketpurchasestate: number;
	emailcoderequest: boolean;
}

interface LoginWorld {
	id: number;
	name: string;
	externaladdress: string;
	externalport: number;
	externaladdressprotected: string;
	externalportprotected: number;
	externaladdressunprotected: string;
	externalportunprotected: number;
	previewstate: number;
	location: string;
	anticheatprotection: boolean;
	pvptype: number;
	// istournamentworld: boolean;
	restrictedstore: boolean;
	// currenttournamentphase: number;
}

interface LoginCharacter {
	worldid: number;
	name: string;
	ismale: boolean;
	tutorial: boolean;
	level: number;
	vocation: string;
	outfitid: number;
	headcolor: number;
	torsocolor: number;
	legscolor: number;
	detailcolor: number;
	addonsflags: number;
	ishidden: number;
	// istournamentparticipant: boolean;
	ismaincharacter: boolean;
	dailyrewardstate: number;
	// remainingdailytournamentplaytime: number;
}

interface LoginResponse {
	session: LoginSession;
	playdata: {
		worlds: LoginWorld[];
		characters: LoginCharacter[];
	};
}

interface ErrorResponse {
	errorCode: number;
	errorMessage: string;
}

export const POST: RequestHandler = async ({ request }) => {
	const params = (await request.json()) as LoginParams;
	switch (params.type) {
		case 'login':
			return json(await handleLogin(params));
		default:
			return json({ errorCode: 1, errorMessage: 'Invalid request.' });
	}
};

async function handleLogin(
	params: LoginParams,
): Promise<LoginResponse | ErrorResponse> {
	const account = await prisma.accounts.findUnique({
		where: {
			email: params.email,
		},
		include: {
			players: true,
		},
	});
	if (!account || hashPassword(params.password) !== account.password) {
		return {
			errorCode: 3,
			errorMessage: 'Email or password is not correct.',
		};
	}

	if (!account.is_verified) {
		return {
			errorCode: 5,
			errorMessage:
				'Your account has not been verified. Please check your email to verify your account.',
		};
	}

	const serverPort = parseInt(SERVER_PORT) ?? 7172;
	const pvptype = ['pvp', 'no-pvp', 'pvp-enforced'].indexOf(PVP_TYPE);

	return {
		session: {
			sessionkey: `${params.email}\n${params.password}`,
			lastlogintime: '0', // TODO: implement last login
			ispremium: true, // TODO: check if premium when free premium is disabled
			premiumuntil: 0,
			status: 'active',
			returnernotification: false,
			showrewardnews: true,
			isreturner: true,
			fpstracking: false,
			optiontracking: false,
			// tournamentticketpurchasestate: 0,
			emailcoderequest: false,
		},
		playdata: {
			// TODO: multiple worlds
			worlds: [
				{
					id: 0,
					name: SERVER_NAME,
					externaladdress: SERVER_ADDRESS,
					externalport: serverPort,
					externaladdressprotected: SERVER_ADDRESS,
					externalportprotected: serverPort,
					externaladdressunprotected: SERVER_ADDRESS,
					externalportunprotected: serverPort,
					previewstate: 0,
					location: 'USA',
					anticheatprotection: false,
					pvptype,
					// istournamentworld: false,
					restrictedstore: false,
					// currenttournamentphase: 0,
				},
			],
			characters: account.players.map(
				(player): LoginCharacter => ({
					worldid: 0,
					name: player.name,
					ismale: player.sex === PlayerSex.Male,
					tutorial: player.istutorial,
					level: player.level,
					vocation: vocationString(player.vocation),
					outfitid: player.looktype,
					headcolor: player.lookhead,
					torsocolor: player.lookbody,
					legscolor: player.looklegs,
					detailcolor: player.lookfeet,
					addonsflags: player.lookaddons,
					ishidden: 0,
					// istournamentparticipant: false,
					ismaincharacter: player.is_main,
					dailyrewardstate: player.isreward ? 1 : 0,
					// remainingdailytournamentplaytime: 0,
				}),
			),
		},
	};
}
