"use client";
import { useState } from "react";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string | null>(searchParams.get("query"));
  const [yearOfRelease, setYearOfRelease] = useState<string | null>(
    searchParams.get("year")
  );
  const [isValidYear, setValidYear] = useState<boolean>(true);

  const handleYear = (year: number) => {
    if (isNaN(year)) {
      setValidYear(true);
      setYearOfRelease(null);
      return;
    }

    if (year < 1890 || year > 2024) {
      setValidYear(false);
      setYearOfRelease(year.toString());
      return;
    }

    setValidYear(true);
    setYearOfRelease(year.toString());
  };

  const handleSearch = () => {
    if (!isValidYear || !query) return;
    router.replace(`${pathname}?query=${query?.trim()}&year=${yearOfRelease}`);
  };

  return (
    <div className={styles["search-holder"]}>
      <input
        className={styles["title-input"]}
        type="text"
        value={query || ""}
        placeholder="Enter movie title..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        title={
          isValidYear
            ? "Enter year of release"
            : "Year must be between 1890-2024"
        }
        className={
          isValidYear ? styles["year-input"] : styles["year-input-error"]
        }
        value={yearOfRelease || ""}
        type="number"
        placeholder="Enter year of release..."
        onChange={(e) => handleYear(e.target.valueAsNumber)}
      />
      <button
        disabled={!isValidYear || !query}
        className={styles["search-button"]}
        onClick={() => handleSearch()}
      >
        Search
      </button>
    </div>
  );
}
