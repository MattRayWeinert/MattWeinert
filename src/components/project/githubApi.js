const IGNORE_DIRS = new Set([
    'node_modules',
    'dist',
    'build',
    '.git',
    '.idea',
    '.vscode',
    'coverage',
    '__pycache__',
    '.next',
    'vendor',
]);

const IGNORE_FILES = /\.(png|jpe?g|gif|webp|ico|svg|woff2?|ttf|eot|mp4|mov|zip|jar|class|o|so|dylib|pdf|lock)$/i;

const TEXT_CAP = 400_000;

const githubFetch = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const message = response.status === 403
            ? 'GitHub rate limit hit — try again in a minute, or open the repo on GitHub.'
            : `GitHub request failed (${response.status}).`;
        throw new Error(message);
    }

    return response;
};

export const fetchRepoMeta = async (repo) => {
    const response = await githubFetch(`https://api.github.com/repos/${repo}`);
    return response.json();
};

export const fetchReadmeHtml = async (repo) => {
    const response = await githubFetch(`https://api.github.com/repos/${repo}/readme`, {
        headers: { Accept: 'application/vnd.github.html' },
    });
    return response.text();
};

export const fetchRepoTree = async (repo, branch) => {
    const response = await githubFetch(
        `https://api.github.com/repos/${repo}/git/trees/${encodeURIComponent(branch)}?recursive=1`
    );
    const data = await response.json();
    const files = (data.tree || [])
        .filter((entry) => entry.type === 'blob')
        .filter((entry) => {
            const parts = entry.path.split('/');
            if (parts.some((part) => IGNORE_DIRS.has(part))) return false;
            if (IGNORE_FILES.test(entry.path)) return false;
            if (entry.size != null && entry.size > TEXT_CAP) return false;
            return true;
        })
        .map((entry) => entry.path)
        .sort((a, b) => a.localeCompare(b));

    return files;
};

export const fetchFileContent = async (repo, path) => {
    const response = await githubFetch(
        `https://api.github.com/repos/${repo}/contents/${path.split('/').map(encodeURIComponent).join('/')}`
    );
    const data = await response.json();

    if (Array.isArray(data)) {
        throw new Error('Path is a directory.');
    }

    if (data.encoding === 'base64' && typeof data.content === 'string') {
        const binary = atob(data.content.replace(/\n/g, ''));
        // Detect obvious binary payloads before rendering as text.
        // eslint-disable-next-line no-control-regex
        if (/[\x00-\x08\x0E-\x1F]/.test(binary.slice(0, 200))) {
            throw new Error('Binary file — open it on GitHub instead.');
        }
        try {
            return decodeURIComponent(escape(binary));
        } catch {
            return binary;
        }
    }

    if (typeof data.content === 'string') return data.content;
    throw new Error('Could not read that file.');
};

export const languageFromPath = (path) => {
    const extension = path.split('.').pop()?.toLowerCase();
    const map = {
        js: 'javascript',
        jsx: 'javascript',
        ts: 'typescript',
        tsx: 'typescript',
        py: 'python',
        java: 'java',
        json: 'json',
        css: 'css',
        html: 'html',
        md: 'markdown',
        yml: 'yaml',
        yaml: 'yaml',
        sh: 'shell',
        bash: 'shell',
        xml: 'xml',
        sql: 'sql',
        go: 'go',
        rs: 'rust',
        c: 'c',
        cpp: 'cpp',
        h: 'c',
        kt: 'kotlin',
        swift: 'swift',
    };
    return map[extension] || extension || 'text';
};
