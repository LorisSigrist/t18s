// @ts-expect-error missing
import Alert from 'virtual:t18s-toolkit:Alert.svelte';

function create_host() {
	const id = 't18s-toolkit-host';
	if (document.getElementById(id) != null) {
		throw new Error('t18s-toolkit-host element already exists');
	}
	const el = document.createElement('div');
	el.setAttribute('id', id);
	document.documentElement.appendChild(el);
	return el;
}

new Alert({ target: create_host() });

console.log('Hello from t18s-toolkit');