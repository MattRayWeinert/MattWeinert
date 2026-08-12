import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
    getGithubRepo,
    getPortfolioItem,
    getYoutubeEmbedId,
} from '../../data/portfolioData';
import useIsMobile from '../../hooks/useIsMobile';
import CodeExplorer from './CodeExplorer';
import './project.css';

const ProjectPage = () => {
    const { projectId } = useParams();
    const isMobile = useIsMobile();
    const project = getPortfolioItem(projectId);
    const repo = getGithubRepo(project);
    const youtubeId = getYoutubeEmbedId(project?.link);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [projectId]);

    useEffect(() => {
        if (!repo || isMobile) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [repo, isMobile]);

    // Code explorer is desktop-only; bounce mobile deep-links back to projects.
    if (isMobile && repo) {
        return <Navigate to={{ pathname: '/', hash: 'projects' }} replace />;
    }

    if (!project || project.private) {
        return (
            <div className="project-page">
                <div className="project-shell project-shell-empty">
                    <Link to={{ pathname: '/', hash: 'projects' }} className="project-back">← Projects</Link>
                    <h1>{project?.private ? 'Private project' : 'Project not found'}</h1>
                    <p className="project-lead">
                        {project?.private
                            ? 'This project is private and isn’t available to view here.'
                            : 'That project isn’t in the portfolio.'}
                    </p>
                </div>
            </div>
        );
    }

    const githubUrl = repo ? `https://github.com/${repo}` : null;
    const externalUrl = project.link && project.link !== githubUrl && !youtubeId
        ? project.link
        : null;

    return (
        <div className={`project-page${repo ? ' has-workspace' : ''}`}>
            <div className="project-ambient" aria-hidden="true" />
            <div className="project-shell">
                <header className="project-toolbar">
                    <div className="project-toolbar-main">
                        <Link to={{ pathname: '/', hash: 'projects' }} className="project-back">← Projects</Link>
                        <div className="project-title-block">
                            <div className="project-title-row">
                                <h1>{project.title}</h1>
                                <ul className="project-tech">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <li key={tech}>{tech}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className="project-lead">{project.description}</p>
                        </div>
                    </div>
                    <div className="project-actions">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                GitHub ↗
                            </a>
                        )}
                        {externalUrl && (
                            <a href={externalUrl} target="_blank" rel="noopener noreferrer">
                                {project.linkLabel || 'Open link'} ↗
                            </a>
                        )}
                    </div>
                </header>

                {repo ? (
                    <div className="project-workspace">
                        <CodeExplorer repo={repo} />
                    </div>
                ) : (
                    <div className="project-fallback">
                        {youtubeId && (
                            <div className="project-embed">
                                <iframe
                                    title={`${project.title} demo`}
                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}
                        {!youtubeId && project.image && (
                            <img
                                className="project-shot"
                                src={project.image}
                                alt={project.alt || project.title}
                            />
                        )}
                        {!youtubeId && (
                            <p className="project-private">
                                {project.link
                                    ? 'No public source repo is embedded here — use the link above.'
                                    : 'Source for this project is available on request.'}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectPage;
