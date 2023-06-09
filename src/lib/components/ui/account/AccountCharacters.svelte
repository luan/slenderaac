<script lang="ts">
	import { faCircle, faDiamond } from '@fortawesome/free-solid-svg-icons';
	import { formatDistanceToNow } from 'date-fns';
	import Fa from 'svelte-fa';
	import { tooltip } from 'svooltip';

	import AnimatedOutfit from '$lib/components/ui/AnimatedOutfit.svelte';
	import { getPronoun, type Player, vocationString } from '$lib/players';

	export let characters: Player[];
</script>

<div class="flex flex-col gap-2">
	<h3 class="h3">Characters</h3>

	<div class="table-container">
		<table class="table table-hover table-auto">
			<thead>
				<tr class="[&>th]:!p-2">
					<th class="w-10" />
					<th class="w-20">Outfit</th>
					<th>Name</th>
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
									{#if character.online}
										<span
											class="text-success-600"
											use:tooltip={{ content: 'Online' }}>
											<Fa icon={faCircle} size="xs" />
										</span>
									{:else}
										<span
											class="text-error-600"
											use:tooltip={{ content: 'Offline' }}>
											<Fa icon={faCircle} size="xs" />
										</span>
									{/if}
									{character.name}
									<em class="font-light">({getPronoun(character)})</em>
									{#if character.isMain}
										<span
											class="text-xs text-success-800"
											use:tooltip={{ content: 'Main Character' }}>
											<Fa icon={faDiamond} />
										</span>
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
										<form class="flex" action="/account/set-main" method="POST">
											<input type="hidden" name="name" value={character.name} />
											<button class="anchor" type="submit">
												Set as main
											</button>
										</form>
									{/if}
									<a
										href="/account/delete?name={character.name}"
										class="anchor"
										type="submit">
										Delete
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
										Deleted
									</span>
									<form
										class="flex"
										action="/account/delete?name={character.name}&cancel=true"
										method="POST">
										(<button class="anchor" type="submit">undelete</button>)
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
		<a href="/account/createcharacter" class="btn btn-sm variant-filled-primary"
			>New Character</a>
	</div>
</div>
