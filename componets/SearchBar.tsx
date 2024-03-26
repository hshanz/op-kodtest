'use client'
import { useState } from "react";
import styles from "./search.module.css";
import { usePathname, useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState<string | null>(null);
  const [yearOfRelease, setYearOfRelease] = useState<number | null>(null);
  const [isValidYear, setValidYear] = useState<boolean>(true);
  const router = useRouter()
  const pathname = usePathname()

  const handleYear = (year: number) => {

    if(isNaN(year)) {
      setYearOfRelease(null);
      setValidYear(true);
      return
    }

    if (year < 1890 || year > 2024) {
      setValidYear(false);
      return;
    }

    setValidYear(true);
    setYearOfRelease(year);
  };

  const handleSearch = () => {
    router.replace(`${pathname}?query=${query?.trim()}&year=${yearOfRelease}`)
  };

  return (
    <div className={styles['search-holder']}>
      <input
        className={styles["title-input"]}
        type="text"
        placeholder="Enter movie title..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        title={isValidYear ? 'Enter year of release' : 'Year must be between 1890-2024'}
        className={
          isValidYear ? styles["year-input"] : styles["year-input-error"]
        }
        type="number"
        placeholder="Enter year of release..."
        onChange={(e) => handleYear(e.target.valueAsNumber)}
      />
      <button className={styles['search-button']} onClick={() => handleSearch()}>Search</button>
    </div>
  );
}
