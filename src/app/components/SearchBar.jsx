import React from "react";

const SearchBar = ({
  query,
  language,
  stars,
  created,
  onQueryChange,
  onLanguageChange,
  onStarsChange,
  onCreatedChange,
  onSubmit,
  onClear,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search repositories..."
          className="p-2 border border-black rounded flex-1 placeholder-gray-600 text-black"
          aria-label="Search query"
        />
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="p-2 border border-black rounded flex-1 text-gray-600"
          aria-label="Filter by language"
        >
          <option value="" disabled>
            Select Language
          </option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="ruby">Ruby</option>
        </select>
        <input
          type="number"
          value={stars}
          onChange={(e) => onStarsChange(e.target.value)}
          placeholder="Min stars (e.g., 1000)"
          className="p-2 border border-black rounded flex-1 placeholder-gray-600"
          aria-label="Filter by minimum stars"
        />
        <input
          type="date"
          value={created}
          onChange={(e) => onCreatedChange(e.target.value)}
          placeholder="Created date"
          className="p-2 border border-black rounded flex-1 placeholder-gray-600"
          aria-label="Filter by creation date"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
