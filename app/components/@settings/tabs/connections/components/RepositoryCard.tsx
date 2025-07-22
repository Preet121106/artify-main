import React from "react";
import { motion } from "framer-motion";
import type { GitHubRepoInfo } from "~/types/GitHub";

interface RepositoryCardProps {
  repo: GitHubRepoInfo;
  onSelect: () => void;
}

import { useMemo } from "react";

export function RepositoryCard({ repo, onSelect }: RepositoryCardProps) {
  // Use a consistent styling for all repository cards
  const getCardStyle = () => {
    return "from-artify-elements-background-depth-1 to-artify-elements-background-depth-1 dark:from-artify-elements-background-depth-2-dark dark:to-artify-elements-background-depth-2-dark";
  };

  // Format the date in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return "Today";
    }

    if (diffDays <= 2) {
      return "Yesterday";
    }

    if (diffDays <= 7) {
      return `${diffDays} days ago`;
    }

    if (diffDays <= 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    }

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const cardStyle = useMemo(() => getCardStyle(), []);

  // const formattedDate = useMemo(() => formatDate(repo.updated_at), [repo.updated_at]);

  return (
    <motion.div
      className={`p-5 rounded-xl bg-gradient-to-br ${cardStyle} border border-artify-elements-borderColor dark:border-artify-elements-borderColor-dark hover:border-green-500/40 transition-all duration-300 shadow-sm hover:shadow-md`}
      whileHover={{
        scale: 1.02,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-artify-elements-background-depth-1/80 dark:bg-artify-elements-background-depth-4/80 backdrop-blur-sm flex items-center justify-center text-green-500 shadow-sm">
            <span className="i-ph:git-branch w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-artify-elements-textPrimary dark:text-artify-elements-textPrimary-dark text-base">
              {repo.name}
            </h3>
            <p className="text-xs text-artify-elements-textTertiary dark:text-artify-elements-textTertiary-dark flex items-center gap-1">
              <span className="i-ph:user w-3 h-3" />
              {repo.full_name.split("/")[0]}
            </p>
          </div>
        </div>
        <motion.button
          onClick={onSelect}
          className="px-4 py-2 h-9 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-200 flex items-center gap-2 min-w-[100px] justify-center text-sm shadow-sm hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="i-ph:git-pull-request w-3.5 h-3.5" />
          Import
        </motion.button>
      </div>

      {repo.description && (
        <div className="mb-4 bg-artify-elements-background-depth-1/50 dark:bg-artify-elements-background-depth-4/50 backdrop-blur-sm p-3 rounded-lg border border-artify-elements-borderColor/30 dark:border-artify-elements-borderColor-dark/30">
          <p className="text-sm text-artify-elements-textSecondary dark:text-artify-elements-textSecondary-dark line-clamp-2">
            {repo.description}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {repo.private && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs">
            <span className="i-ph:lock w-3 h-3" />
            Private
          </span>
        )}
        {repo.language && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-artify-elements-background-depth-1/50 dark:bg-artify-elements-background-depth-4/50 backdrop-blur-sm text-artify-elements-textSecondary dark:text-artify-elements-textSecondary-dark text-xs border border-artify-elements-borderColor/30 dark:border-artify-elements-borderColor-dark/30">
            <span className="i-ph:code w-3 h-3" />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-artify-elements-background-depth-1/50 dark:bg-artify-elements-background-depth-4/50 backdrop-blur-sm text-artify-elements-textSecondary dark:text-artify-elements-textSecondary-dark text-xs border border-artify-elements-borderColor/30 dark:border-artify-elements-borderColor-dark/30">
          <span className="i-ph:star w-3 h-3" />
          {repo.stargazers_count.toLocaleString()}
        </span>
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-artify-elements-background-depth-1/50 dark:bg-artify-elements-background-depth-4/50 backdrop-blur-sm text-artify-elements-textSecondary dark:text-artify-elements-textSecondary-dark text-xs border border-artify-elements-borderColor/30 dark:border-artify-elements-borderColor-dark/30">
            <span className="i-ph:git-fork w-3 h-3" />
            {repo.forks_count.toLocaleString()}
          </span>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-artify-elements-borderColor/30 dark:border-artify-elements-borderColor-dark/30 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-artify-elements-textTertiary dark:text-artify-elements-textTertiary-dark">
          <span className="i-ph:clock w-3 h-3" />
          Updated {formatDate(repo.updated_at)}
        </span>

        {repo.topics && repo.topics.length > 0 && (
          <span className="text-xs text-artify-elements-textTertiary dark:text-artify-elements-textTertiary-dark">
            {repo.topics.slice(0, 1).map((topic) => (
              <span
                key={topic}
                className="px-1.5 py-0.5 rounded-full bg-artify-elements-background-depth-1/50 dark:bg-artify-elements-background-depth-4/50 text-xs"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 1 && <span className="ml-1">+{repo.topics.length - 1}</span>}
          </span>
        )}
      </div>
    </motion.div>
  );
}
