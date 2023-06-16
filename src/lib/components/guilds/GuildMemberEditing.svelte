<script lang="ts">
	import Select from '$lib/components/ui/forms/Select.svelte';
	import TextField from '$lib/components/ui/forms/TextField.svelte';

	export let member: {
		id: number;
		name: string;
		nick: string;
		rank: {
			id: number;
			name: string;
			level: number;
			order: number;
		};
	};
	export let ranks: {
		id: number;
		name: string;
	}[];
</script>

<div class="flex flex-row gap-2 items-center">
	<span class="w-1/3">
		{member.name}
	</span>
	<span class="w-1/3">
		<Select
			name={`members.${member.id}.rank`}
			value={member.rank.id.toString()}
			variant="horizontal">
			{#each ranks as rank}
				<option value={rank.id.toString()}>{rank.name}</option>
			{/each}
		</Select>
	</span>
	<span class="w-1/3">
		<TextField
			name={`members.${member.id}.nick`}
			value={member.nick}
			variant="horizontal" />
	</span>
</div>
