import { ChangeEvent, useState } from "react";
import SearchResultModal from "./search-result-modal/SearchResultModal";
import { useTranslation } from "react-i18next";
import { StyledSearchBarContainer } from "./SearchBarContainer";
import { StyledSearchBarInput } from "./SearchBarInput";
import { useGetSearchUsers } from "../../hooks/htttpServicesHooks/user.hooks";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickAway } from "@uidotdev/usehooks";

export const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const searchQuery = useDebounce(query, 300);
  const { t } = useTranslation();
  const { data: results } = useGetSearchUsers(searchQuery, 4, 0);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const searchBarRef = useClickAway<HTMLDivElement>(() => {
    setResultModalOpen(false);
  });
  return (
    <StyledSearchBarContainer ref={searchBarRef}>
      <StyledSearchBarInput
        onChange={handleChange}
        value={query}
        placeholder={t("placeholder.search")}
        onClick={() => setResultModalOpen(true)}
      />
      {
        <SearchResultModal
          show={searchQuery.length > 0 && resultModalOpen}
          results={results || []}
        />
      }
    </StyledSearchBarContainer>
  );
};
