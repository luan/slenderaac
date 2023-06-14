<script lang="ts">
	import {
		faCalendarAlt,
		faCoins,
		faCrown,
		faDoorOpen,
		faPersonCirclePlus,
	} from '@fortawesome/free-solid-svg-icons';
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import OnlineIndicator from '$lib/components/ui/OnlineIndicator.svelte';
	import { vocationString } from '$lib/players';
	import { formatDate } from '$lib/utils';

	import type { PageData } from './$types';

	export let data: PageData;

	$: guild = data.guild;
	$: owner = guild?.owner;
	$: accountCharacterNames = data.accountCharacters?.map((c) => c.name) ?? [];
	$: isOwner = owner && accountCharacterNames.includes(owner.name);
	$: isLeader =
		isOwner ||
		guild?.ranks
			.filter((r) => r.level === 3)
			.some((r) =>
				r.members.some((m) => accountCharacterNames.includes(m.name)),
			);
	$: isVice =
		isLeader ||
		guild?.ranks
			.filter((r) => r.level === 2)
			.some((r) =>
				r.members.some((m) => accountCharacterNames.includes(m.name)),
			);
	$: isMember =
		isVice ||
		guild?.ranks
			.filter((r) => r.level < 2)
			.some((r) =>
				r.members.some((m) => accountCharacterNames.includes(m.name)),
			);
</script>

{#if guild && owner}
	<div class="flex flex-col gap-2 items-center">
		<h3 class="h3">{guild.name}</h3>
		{#if guild.description}
			<div class="flex data-table p-2">
				<pre
					class="font-sans font-light whitespace-pre-wrap">{guild.description}</pre>
			</div>
		{/if}
		<div class="flex flex-row w-full justify-between items-center">
			<div class="flex flex-row items-end gap-1">
				{#if isVice}
					<Button
						href="/guilds/{guild.name}/invite"
						size="sm"
						iconBefore={faPersonCirclePlus}>
						{$_('guilds.invite')}
					</Button>
				{/if}
				{#if isMember}
					<Button
						href="/guilds/{guild.name}/leave"
						size="xs"
						color="error"
						iconBefore={faDoorOpen}>
						{$_('guilds.leave')}
					</Button>
				{/if}
			</div>
			<div class="text-sm font-light text-surface-800-100-token">
				<span class="flex flex-row items-center gap-1">
					<Fa icon={faCrown} class="text-primary-600-300-token" />
					{@html $_('guilds.leader-label', { values: { name: owner.name } })}
				</span>
				<span class="flex flex-row items-center gap-1">
					<Fa
						icon={faCalendarAlt}
						class="text-tertiary-500 dark:text-tertiary-300" />
					{$_('guilds.founded', {
						values: {
							name: guild.name,
							date: formatDate(guild.createdAt, { short: true }),
						},
					})}
				</span>
				<span class="flex flex-row items-center gap-1">
					<Fa icon={faCoins} class="text-warning-700 dark:text-warning-500" />
					{@html $_('guilds.balance', {
						values: { balance: guild.balance.toString() },
					})}
				</span>
			</div>
		</div>

		<div class="table-container">
			<table class="table table-noeven table-hover table-auto">
				<thead class="border-x-4">
					<tr class="[&>th]:!p-2">
						<th class="w-20">Outfit</th>
						<th>{$_('name')}</th>
						<th class="w-32">{$_('vocation')}</th>
						<th class="w-24">{$_('level')}</th>
					</tr>
				</thead>
				{#each guild.ranks as rank}
					<tr
						class="text-white border-4"
						class:bg-primary-500={rank.level === 3}
						class:bg-secondary-500={rank.level === 2}
						class:bg-tertiary-500={rank.level < 2}
						class:border-primary-500={rank.level === 3}
						class:border-secondary-500={rank.level === 2}
						class:border-tertiary-500={rank.level < 2}>
						<th colspan="5" class="text-center">{rank.name}</th>
					</tr>
					<tbody
						class="transition-all duration-300 ease-in-out border-x-4"
						class:bg-primary-200-700-token={rank.level === 3}
						class:bg-secondary-200-700-token={rank.level === 2}
						class:bg-tertiary-200-700-token={rank.level < 2}
						class:border-primary-500={rank.level === 3}
						class:border-secondary-500={rank.level === 2}
						class:border-tertiary-500={rank.level < 2}>
						{#each rank.members as character}
							<a
								href="/characters/{character.name}"
								class="table-row [&>td]:!align-middle cursor-pointer border-b"
								class:border-primary-300-600-token={rank.level === 3}
								class:border-secondary-300-600-token={rank.level === 2}
								class:border-tertiary-300-600-token={rank.level < 2}
								transition:fly|local={{
									duration: 300,
									y: -20,
									easing: cubicInOut,
								}}>
								<td>
									<AnimatedOutfit outfit={character} alt={character.name} />
								</td>
								<td class=" w-fit">
									<div class="flex flex-col w-fit">
										<span
											class="font-semibold flex flex-row gap-1 items-center">
											<OnlineIndicator online={character.online} />
											{character.name}
											{#if character.guild?.nick}
												<em class="font-light">({character.guild.nick})</em>
											{/if}
										</span>
									</div>
								</td>
								<td>{vocationString(character.vocation)}</td>
								<td>{character.level}</td>
							</a>
						{/each}
					</tbody>
				{/each}
			</table>
		</div>
	</div>
{:else}
	<h5 class="h4">{data.error}</h5>
{/if}
