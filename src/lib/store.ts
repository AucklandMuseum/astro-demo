import { atom } from 'nanostores';

const MaoriLocale = atom("mi-NZ")
const EnglishLocale = atom("en-NZ")
const DefaultLocale = atom("en-NZ")


const toggleLang = () => {
	if(DefaultLocale.get() === EnglishLocale.get()) DefaultLocale.set(MaoriLocale.get())
	else DefaultLocale.set(EnglishLocale.get())}

export { MaoriLocale, EnglishLocale, DefaultLocale , toggleLang };