import React, { useEffect, useMemo, useState } from 'react';
import {
    fetchFileContent,
    fetchRepoMeta,
    fetchRepoTree,
    languageFromPath,
} from './githubApi';

const buildFileTree = (paths) => {
    const root = { name: '', path: '', type: 'dir', children: {} };

    paths.forEach((filePath) => {
        const parts = filePath.split('/');
        let current = root;

        parts.forEach((part, index) => {
            const isFile = index === parts.length - 1;
            const path = parts.slice(0, index + 1).join('/');

            if (!current.children[part]) {
                current.children[part] = {
                    name: part,
                    path,
                    type: isFile ? 'file' : 'dir',
                    children: isFile ? null : {},
                };
            } else if (!isFile && current.children[part].type === 'file') {
                // Extremely unlikely path collision; keep as directory container.
                current.children[part] = {
                    ...current.children[part],
                    type: 'dir',
                    children: {},
                };
            }

            if (!isFile) {
                current = current.children[part];
            }
        });
    });

    return root;
};

const sortNodes = (nodes) => nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
});

const getChildNodes = (node) => {
    if (!node?.children) return [];
    return sortNodes(Object.values(node.children));
};

const ancestorDirs = (filePath) => {
    if (!filePath) return [];
    const parts = filePath.split('/');
    const dirs = [];
    for (let i = 1; i < parts.length; i += 1) {
        dirs.push(parts.slice(0, i).join('/'));
    }
    return dirs;
};

const TreeNode = ({
    node,
    depth,
    activePath,
    expanded,
    onToggle,
    onSelectFile,
}) => {
    if (node.type === 'file') {
        return (
            <button
                type="button"
                className={`tree-row tree-file${node.path === activePath ? ' is-active' : ''}`}
                style={{ '--depth': depth }}
                onClick={() => onSelectFile(node.path)}
                title={node.path}
                role="treeitem"
                aria-selected={node.path === activePath}
            >
                <span className="tree-file-mark" aria-hidden="true" />
                <span className="tree-label">{node.name}</span>
            </button>
        );
    }

    const isOpen = expanded.has(node.path);
    const children = getChildNodes(node);

    return (
        <div className="tree-dir" role="group">
            <button
                type="button"
                className={`tree-row tree-folder${isOpen ? ' is-open' : ''}`}
                style={{ '--depth': depth }}
                onClick={() => onToggle(node.path)}
                aria-expanded={isOpen}
                aria-selected={false}
                title={node.path || 'root'}
                role="treeitem"
            >
                <span className="tree-chevron" aria-hidden="true" />
                <span className="tree-folder-mark" aria-hidden="true" />
                <span className="tree-label">{node.name}</span>
            </button>
            {isOpen && children.map((child) => (
                <TreeNode
                    key={child.path}
                    node={child}
                    depth={depth + 1}
                    activePath={activePath}
                    expanded={expanded}
                    onToggle={onToggle}
                    onSelectFile={onSelectFile}
                />
            ))}
        </div>
    );
};

const CodeExplorer = ({ repo }) => {
    const [branch, setBranch] = useState('');
    const [files, setFiles] = useState([]);
    const [activePath, setActivePath] = useState('');
    const [content, setContent] = useState('');
    const [filter, setFilter] = useState('');
    const [status, setStatus] = useState('Loading repository…');
    const [error, setError] = useState(null);
    const [loadingFile, setLoadingFile] = useState(false);
    const [expanded, setExpanded] = useState(() => new Set());

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setStatus('Loading repository…');
            setError(null);
            setFiles([]);
            setActivePath('');
            setContent('');
            setExpanded(new Set());

            try {
                const meta = await fetchRepoMeta(repo);
                if (cancelled) return;
                const defaultBranch = meta.default_branch || 'main';
                setBranch(defaultBranch);

                setStatus('Loading file tree…');
                const tree = await fetchRepoTree(repo, defaultBranch);
                if (cancelled) return;

                setFiles(tree);
                setStatus('');

                const preferred = tree.find((path) => /^readme(\.|$)/i.test(path.split('/').pop()))
                    || tree.find((path) => path === 'package.json' || path === 'pom.xml' || path === 'main.py')
                    || tree[0];

                if (preferred) {
                    setActivePath(preferred);
                    setExpanded(new Set(ancestorDirs(preferred)));
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Failed to load repository.');
                    setStatus('');
                }
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [repo]);

    useEffect(() => {
        if (!activePath) return undefined;

        let cancelled = false;

        const loadFile = async () => {
            setLoadingFile(true);
            setError(null);
            try {
                const text = await fetchFileContent(repo, activePath);
                if (!cancelled) setContent(text);
            } catch (err) {
                if (!cancelled) {
                    setContent('');
                    setError(err.message || 'Failed to load file.');
                }
            } finally {
                if (!cancelled) setLoadingFile(false);
            }
        };

        loadFile();
        return () => {
            cancelled = true;
        };
    }, [repo, activePath]);

    const visibleFiles = useMemo(() => {
        const query = filter.trim().toLowerCase();
        if (!query) return files;
        return files.filter((path) => path.toLowerCase().includes(query));
    }, [files, filter]);

    const fileTree = useMemo(() => buildFileTree(visibleFiles), [visibleFiles]);
    const rootNodes = useMemo(() => getChildNodes(fileTree), [fileTree]);

    useEffect(() => {
        const query = filter.trim().toLowerCase();
        if (!query) return;

        setExpanded((prev) => {
            const next = new Set(prev);
            visibleFiles.forEach((path) => {
                ancestorDirs(path).forEach((dir) => next.add(dir));
            });
            return next;
        });
    }, [filter, visibleFiles]);

    const toggleFolder = (path) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(path)) next.delete(path);
            else next.add(path);
            return next;
        });
    };

    const selectFile = (path) => {
        setActivePath(path);
        setExpanded((prev) => {
            const next = new Set(prev);
            ancestorDirs(path).forEach((dir) => next.add(dir));
            return next;
        });
    };

    const lines = content ? content.split('\n') : [];
    const language = activePath ? languageFromPath(activePath) : '';

    return (
        <div className="code-explorer">
            <aside className="code-tree">
                <div className="code-tree-head">
                    <p>
                        <span>{repo}</span>
                        {branch ? ` @ ${branch}` : ''}
                    </p>
                    <input
                        type="search"
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                        placeholder="Filter files…"
                        aria-label="Filter files"
                    />
                </div>
                <div className="code-tree-list" role="tree">
                    {status && !files.length && <p className="code-muted">{status}</p>}
                    {rootNodes.map((node) => (
                        <TreeNode
                            key={node.path}
                            node={node}
                            depth={0}
                            activePath={activePath}
                            expanded={expanded}
                            onToggle={toggleFolder}
                            onSelectFile={selectFile}
                        />
                    ))}
                    {!status && !rootNodes.length && (
                        <p className="code-muted">No matching files.</p>
                    )}
                </div>
            </aside>

            <section className="code-pane">
                <header className="code-pane-head">
                    <p>{activePath || 'Select a file'}</p>
                </header>

                {error && <p className="code-error">{error}</p>}

                {loadingFile && <p className="code-muted">Loading file…</p>}

                {!loadingFile && activePath && content && (
                    <div className="code-scroll" data-lang={language}>
                        <pre>
                            <code>
                                {lines.map((line, index) => (
                                    <span className="code-line" key={`${index}-${line.slice(0, 12)}`}>
                                        <span className="code-gutter" aria-hidden="true">{index + 1}</span>
                                        <span className="code-text">{line || ' '}</span>
                                    </span>
                                ))}
                            </code>
                        </pre>
                    </div>
                )}

                {!loadingFile && !error && !activePath && (
                    <p className="code-muted">Pick a file from the tree to view live source from GitHub.</p>
                )}
            </section>
        </div>
    );
};

export default CodeExplorer;
