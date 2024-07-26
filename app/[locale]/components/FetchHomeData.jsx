// components/FetchHomeData.js (Server Component)
import { getlocales } from "../../actions";

export default async function FetchHomeData({ lang }) {
  const { home } = await getlocales(lang.locale);
  return home;
}