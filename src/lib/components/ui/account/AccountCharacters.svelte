<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import { _ } from 'svelte-i18n';
	import { tooltip } from 'svooltip';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import MainCharacterIndicator from '$lib/components/ui/MainCharacterIndicator.svelte';
	import OnlineIndicator from '$lib/components/ui/OnlineIndicator.svelte';
	import { getPronoun, type Player, vocationString } from '$lib/players';

	export let characters: Player[];
</script>

<div class="flex flex-col gap-2">
	<h3 class="h3">{$_('characters')}</h3>

	<div class="table-container">
		<table class="table table-hover table-auto">
			<thead>
				<tr class="[&>th]:!p-2">
					<th class="w-10" />
					<th class="w-20">{$_('outfit')}</th>
					<th>{$_('name')}</th>
					<th class="w-48" />
				</tr>
			</thead>
			<tbody>
				{#each characters as character, i}
					<tr class="[&>td]:!align-middle">
						<td>{i + 1}</td>
						<td>
							<AnimatedOutfit outfit={character} alt={character.name} />
						</td>
						<td>
							<div class="flex flex-col">
								<span class="font-semibold flex flex-row gap-1 items-center">
									<OnlineIndicator online={character.online} />
									{character.name}
									<em class="font-light">({getPronoun(character)})</em>
									{#if character.isMain}
										<MainCharacterIndicator />
									{/if}
								</span>
								<span class="text-xs">
									{vocationString(character.vocation)} &dash; Level {character.level}
								</span>
							</div>
						</td>
						<td>
							<div class="flex flex-col gap-1 items-center">
								{#if !character.deletion}
									{#if !character.isMain}
										<form
											class="flex"
											action="/account/characters/set-main"
											method="POST">
											<input type="hidden" name="name" value={character.name} />
											<button class="anchor" type="submit">
												{$_('set-as-main')}
											</button>
										</form>
									{/if}
									<a
										href="/account/characters/delete?name={character.name}"
										class="anchor"
										type="submit">
										{$_('delete')}
									</a>
								{:else}
									<span
										class="text-error-600"
										use:tooltip={{
											content: `"${
												character.name
											}"" will be deleted in ${formatDistanceToNow(
												Number(character.deletion) * 1000,
											)}`,
										}}>
										{$_('deleted')}
									</span>
									<form
										class="flex"
										action="/account/characters/delete?name={character.name}&cancel=true"
										method="POST">
										(<button class="anchor" type="submit"
											>{$_('undelete')}</button
										>)
									</form>
								{/if}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex flex-row justify-end">
		<a
			href="/account/characters/create"
			class="btn btn-sm variant-filled-primary">{$_('new-character')}</a>
	</div>
</div>
