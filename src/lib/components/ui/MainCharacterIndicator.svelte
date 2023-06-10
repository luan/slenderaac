<script lang="ts">
	import { faDiamond } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { tooltip } from 'svooltip';
</script>

<span
	class="text-xs text-primary-800"
	use:tooltip={{ content: 'Main Character' }}>
	<Fa icon={faDiamond} />
</span>
