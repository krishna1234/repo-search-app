import React from "react";

const RepositoryCard = ({ repo }) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col gap-2"
    >
      <h3 className="text-lg font-semibold text-blue-600">{repo.name}</h3>
      <p className="text-gray-600 line-clamp-2">
        {repo.description || "No description available"}
      </p>
      <div className="flex gap-4 text-sm text-gray-500">
        <span>⭐ {repo.stargazers_count}</span>
        <span>📚 {repo.language || "Unknown"}</span>
        <span>🍴 {repo.forks_count}</span>
      </div>
    </a>
  );
};

export default RepositoryCard;
