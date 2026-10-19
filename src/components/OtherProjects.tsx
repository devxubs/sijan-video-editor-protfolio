import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import { ThemeMode } from '../types';
import { OTHER_PROJECTS } from '../data/tools';

export const OtherProjects: React.FC<{ theme?: ThemeMode }> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <section
      id="personal-projects"
      className={`py-14 sm:py-18 border-b transition-colors duration-300 ${
        isLight ? 'bg-zinc-100/50 border-zinc-200/80' : 'bg-zinc-950/40 border-zinc-900/80'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Other Projects</h2>
          <p className={`mt-1 text-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Small web utilities I built for editing and motion design workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {OTHER_PROJECTS.map((project) => (
            <a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block p-5 rounded-xl border transition-all duration-200 ${
                isLight
                  ? 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className={`text-[11px] font-mono block mb-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {project.category}
                  </span>
                  <h3
                    className={`text-base font-semibold transition-colors ${
                      isLight ? 'text-zinc-900 group-hover:text-red-600' : 'text-zinc-100 group-hover:text-red-500'
                    }`}
                  >
                    {project.title}
                  </h3>
                </div>
                <div
                  className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                    isLight
                      ? 'border-zinc-200 text-zinc-400 group-hover:text-zinc-700 group-hover:border-zinc-300'
                      : 'border-zinc-800 text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-700'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {project.description}
              </p>

              <div
                className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium ${
                  isLight ? 'text-zinc-500 group-hover:text-red-600' : 'text-zinc-400 group-hover:text-red-400'
                }`}
              >
                <Link2 className="w-3 h-3" />
                <span>{project.displayUrl}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
