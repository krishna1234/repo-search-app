import React from "react";
import RepositoryCard from "./RepositoryCard";

const RepositoryList = ({ repositories }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepositoryList;
