import { ref } from "vue";

export type Theme = 'light' | 'dark';

export const theme = ref<Theme>(getTheme());

export function getTheme(): Theme
{
    return document.documentElement.getAttribute('data-theme') as any;
}

export function switchTheme()
{
    setTheme(getTheme() === 'light' ? 'dark' : 'light');
}

function setTheme(newTheme: Theme)
{
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    theme.value = newTheme;
}