import { minifyHook } from "$lib/hooks/minify";
import { localeHook } from "$lib/hooks/setLocale";
import { sequence } from "@sveltejs/kit/hooks";

export const handle = sequence(localeHook, minifyHook);
