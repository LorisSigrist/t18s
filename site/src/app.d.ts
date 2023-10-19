// See https://kit.svelte.dev/docs/types#app

import type { Locale } from "$t18s";
import 'unplugin-icons/types/svelte'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locale
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
