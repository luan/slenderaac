<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<div class="flex flex-row justify-between gap-2">
	<span />
	<div class="flex flex-row justify-start gap-2">
		<a
			href="/account/change-password"
			class="btn btn-sm variant-filled-primary">
			{$_('change-password')}
		</a>
		<a href="/account/change-email" class="btn btn-sm variant-filled-primary">
			{$_('change-email')}
		</a>
	</div>
</div>
