<input type="checkbox" class="theme-switch" id="theme-switch" />

<div id="page">
	<div class="label">
		<label for="theme-switch" class="switch-label" />
	</div>
</div>

<style>
	:root {
		--dark-switch-shadow: #fce477;
		--dark-switch-icon: '🌒';

		--light-switch-shadow: #fce477;
		--light-switch-icon: '☀';

		/* Default */
		--switch-icon: var(--dark-switch-icon);
		--switch-shadow-color: var(--dark-switch-shadow);
	}

	.theme-switch {
		display: none;
	}

	.label {
		position: relative;
		display: flex;
		align-items: center;
	}

	.switch-label {
		width: 2.2rem;
		height: 1rem;
		display: flex;
		align-items: center;
	}

	.switch-label::before,
	.switch-label::after {
		content: '';
		display: block;
		position: absolute;
		cursor: pointer;
	}

	.switch-label::before {
		width: 2.2rem;
		height: 1rem;
		background-color: #fff;
		border-radius: 100rem;
		-webkit-transition: background-color 0.25s ease;
		transition: background-color 0.25s ease;
	}

	.switch-label::after {
		left: -0.25rem;
		content: var(--switch-icon);
		font-size: 1.5rem;
		-webkit-transition: left 0.25s ease;
		transition: left 0.25s ease;
	}

	.theme-switch:checked ~ #page .switch-label::before {
		background: green;
	}

	.theme-switch:checked ~ #page .switch-label::after {
		left: 1rem;
	}

	.theme-switch:checked ~ #page {
		--switch-shadow-color: var(--light-switch-shadow);
		--switch-icon: var(--light-switch-icon);
	}
</style>
