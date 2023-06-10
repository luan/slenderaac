<script lang="ts">
	import { faDiamond } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { _ } from 'svelte-i18n';
	import { tooltip } from 'svooltip';
</script>

<span
	class="text-xs text-primary-800"
	use:tooltip={{ content: $_('${keypath}') }}>
	<Fa icon={faDiamond} />
</span>
