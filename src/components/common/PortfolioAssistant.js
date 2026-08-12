import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import resume from '../../assets/resume.pdf';
import { experiences } from '../../data/experienceData';
import { portfolioItems } from '../../data/portfolioData';

const SECTIONS = {
    home: '#top',
    top: '#top',
    '~': '#top',
    projects: '#projects',
    experience: '#experience',
    contact: '#contact',
};

const SECTION_LIST = ['home', 'projects', 'experience', 'contact', 'resume'];

const COMMANDS = [
    'help',
    'ls',
    'cd',
    'pwd',
    'whoami',
    'about',
    'stack',
    'skills',
    'experience',
    'projects',
    'hobbies',
    'contact',
    'resume',
    'github',
    'linkedin',
    'clear',
    'echo',
    'sudo',
];

const SHORTCUTS = [
    'help',
    'ls',
    'cd projects',
    'cd experience',
    'contact --help',
];

const HELP_ROWS = [
    ['help', 'this menu'],
    ['ls', 'list site sections'],
    ['ls <section>', 'list contents of a section'],
    ['cd <section>', 'jump to a section'],
    ['pwd', 'where you are'],
    ['whoami', 'who are you?'],
    ['about', 'bio snapshot'],
    ['stack', 'tech stack'],
    ['experience', 'career summary'],
    ['projects', 'selected projects'],
    ['hobbies', 'outside of work'],
    ['contact', 'email Matt via flags'],
    ['resume', 'open resume PDF'],
    ['github', 'open GitHub'],
    ['linkedin', 'open LinkedIn'],
    ['clear', 'clean the screen'],
];

const BOOT_LINES = [
    { kind: 'system', text: 'mattweinert.com shell v1.0' },
    { kind: 'output', text: 'guest session ready. type help to begin.' },
    { kind: 'hint', text: 'Hint: tab completes, arrows browse history' },
];

const TYPE_CHUNK = 3;
const TYPE_DELAY_MS = 14;

const parseArgs = (input) => {
    const tokens = [];
    const regex = /"([^"]*)"|'([^']*)'|(\S+)/g;
    let match = regex.exec(input);
    while (match) {
        tokens.push(match[1] ?? match[2] ?? match[3]);
        match = regex.exec(input);
    }
    return tokens;
};

const parseFlags = (tokens) => {
    const flags = {};
    for (let i = 0; i < tokens.length; i += 1) {
        const token = tokens[i];
        if (!token.startsWith('-')) continue;

        const key = token.replace(/^--?/, '');
        const mapped =
            key === 'n' || key === 'name' ? 'name'
                : key === 'e' || key === 'email' ? 'email'
                    : key === 'm' || key === 'message' || key === 'msg' ? 'message'
                        : key === 'h' || key === 'help' ? 'help'
                            : key;

        const next = tokens[i + 1];
        if (mapped === 'help') {
            flags.help = true;
            continue;
        }

        if (next && !next.startsWith('-')) {
            flags[mapped] = next;
            i += 1;
        } else {
            flags[mapped] = true;
        }
    }
    return flags;
};

const pad = (left, width) => left + ' '.repeat(Math.max(1, width - left.length));

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const PortfolioAssistant = () => {
    const [lines, setLines] = useState([]);
    const [draft, setDraft] = useState('');
    const [busy, setBusy] = useState(true);
    const [history, setHistory] = useState([]);
    const historyIndexRef = useRef(-1);
    const draftBackupRef = useRef('');
    const inputRef = useRef(null);
    const listRef = useRef(null);
    const typingTimerRef = useRef(null);
    const typingGenRef = useRef(0);
    const reduceMotionRef = useRef(false);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    const isConfigured = Boolean(serviceId && templateId && publicKey);

    const scrollToBottom = () => {
        const list = listRef.current;
        if (list) list.scrollTop = list.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [lines]);

    const stopTyping = () => {
        if (typingTimerRef.current) {
            window.clearInterval(typingTimerRef.current);
            typingTimerRef.current = null;
        }
    };

    const abortTyping = ({ resetLines = false } = {}) => {
        typingGenRef.current += 1;
        stopTyping();
        if (resetLines) {
            setLines([]);
        } else {
            setLines((existing) => existing.filter((line) => line.complete !== false));
        }
    };

    const pushInstant = (next) => {
        const items = (Array.isArray(next) ? next : [next]).map((line) => ({
            id: makeId(),
            complete: true,
            ...line,
            text: line.text ?? '',
        }));
        setLines((current) => [...current, ...items]);
    };

    const typeOut = (next) => {
        const items = (Array.isArray(next) ? next : [next]).map((line) => ({
            id: makeId(),
            kind: line.kind || 'output',
            fullText: line.text ?? '',
            text: '',
            complete: false,
        }));

        if (!items.length) return Promise.resolve();

        // Drop any orphan incomplete lines from an aborted session, then start fresh.
        abortTyping();
        const gen = typingGenRef.current;

        if (reduceMotionRef.current) {
            setLines((current) => [
                ...current,
                ...items.map((line) => ({
                    ...line,
                    text: line.fullText,
                    complete: true,
                })),
            ]);
            return Promise.resolve();
        }

        setBusy(true);

        return new Promise((resolve) => {
            let itemIndex = 0;

            const isStale = () => gen !== typingGenRef.current;

            const finishAll = () => {
                if (!isStale()) {
                    stopTyping();
                    setBusy(false);
                    window.setTimeout(() => inputRef.current?.focus(), 0);
                }
                resolve();
            };

            const startItem = () => {
                if (isStale()) {
                    finishAll();
                    return;
                }

                if (itemIndex >= items.length) {
                    finishAll();
                    return;
                }

                const current = items[itemIndex];
                setLines((existing) => [...existing, { ...current }]);

                if (!current.fullText) {
                    setLines((existing) =>
                        existing.map((line) =>
                            line.id === current.id ? { ...line, complete: true } : line
                        )
                    );
                    itemIndex += 1;
                    startItem();
                    return;
                }

                let charIndex = 0;
                stopTyping();
                typingTimerRef.current = window.setInterval(() => {
                    if (isStale()) {
                        stopTyping();
                        setLines((existing) => existing.filter((line) => line.id !== current.id));
                        resolve();
                        return;
                    }

                    charIndex = Math.min(charIndex + TYPE_CHUNK, current.fullText.length);
                    const nextText = current.fullText.slice(0, charIndex);
                    const done = charIndex >= current.fullText.length;

                    setLines((existing) =>
                        existing.map((line) =>
                            line.id === current.id
                                ? { ...line, text: nextText, complete: done }
                                : line
                        )
                    );

                    if (done) {
                        stopTyping();
                        itemIndex += 1;
                        startItem();
                    }
                }, TYPE_DELAY_MS);
            };

            startItem();
        });
    };

    useEffect(() => {
        reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Defer boot so React Strict Mode's immediate effect cleanup doesn't leave an
        // empty incomplete line with a blinking caret in the top-left of the shell.
        const bootTimer = window.setTimeout(() => {
            typeOut(BOOT_LINES);
        }, 0);
        return () => {
            window.clearTimeout(bootTimer);
            abortTyping({ resetLines: true });
            setBusy(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const resolveSection = (target) => {
        const key = target.replace(/^\.\//, '').replace(/\/$/, '').toLowerCase();
        if (key === 'resume') {
            return {
                ok: true,
                key,
                action: 'resume',
                message: 'navigating to resume.pdf …',
            };
        }

        const hash = SECTIONS[key];
        if (!hash) {
            return {
                ok: false,
                message: `cd: no such section: ${target}\ntry: ${SECTION_LIST.join('  ')}`,
            };
        }

        return {
            ok: true,
            key,
            hash,
            message: `navigating to ${key}/ …`,
        };
    };

    const performNavigate = (result) => {
        if (result.action === 'resume') {
            window.open(resume, '_blank', 'noopener,noreferrer');
            return;
        }

        const el = document.querySelector(result.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.location.hash = result.hash;
    };

    const listSectionContents = (section) => {
        const key = section.replace(/^\.\//, '').replace(/\/$/, '').toLowerCase();

        if (key === 'projects') {
            return portfolioItems
                .filter((project) => project.featured)
                .map((project, index) => (
                    `${String(index + 1).padStart(2, '0')}  ${project.title}`
                )).join('\n') + '\n\ntip: cd projects';
        }

        if (key === 'experience') {
            return experiences.map((experience) => (
                `${experience.lineDate}  ${experience.company} — ${experience.position}`
            )).join('\n') + '\n\ntip: cd experience';
        }

        if (key === 'contact') {
            return [
                'email     MatthewRaymondWeinert@gmail.com',
                'github    MattRayWeinert',
                'linkedin  /in/matt-weinert',
                'location  Orlando, FL',
                '',
                'tip: cd contact   or   contact --help',
            ].join('\n');
        }

        if (key === 'home' || key === 'top' || key === '~') {
            return [
                'hero      intro + this shell',
                'actions   get in touch · cd projects',
                '',
                'tip: cd home',
            ].join('\n');
        }

        if (key === 'resume') {
            return 'resume.pdf\n\ntip: cd resume   or   resume';
        }

        return null;
    };

    const wait = (ms) => new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });

    const contactHelp = [
        'usage: contact --name <name> --email <email> --message "<text>"',
        'aliases: -n  -e  -m',
        '',
        'example:',
        '  contact -n "Ada Lovelace" -e ada@analytic.engine -m "Loved the portfolio."',
        '',
        'sends an email to Matt via the site mailer.',
    ].join('\n');

    const runContact = async (flags) => {
        if (flags.help) {
            await typeOut({ kind: 'output', text: contactHelp });
            return;
        }

        const name = typeof flags.name === 'string' ? flags.name.trim() : '';
        const email = typeof flags.email === 'string' ? flags.email.trim() : '';
        const message = typeof flags.message === 'string' ? flags.message.trim() : '';

        const missing = [];
        if (!name) missing.push('--name');
        if (!email) missing.push('--email');
        if (!message) missing.push('--message');

        if (missing.length) {
            await typeOut({
                kind: 'error',
                text: `contact: missing ${missing.join(', ')}\nrun contact --help for usage`,
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            await typeOut({ kind: 'error', text: 'contact: invalid --email address' });
            return;
        }

        if (!isConfigured) {
            await typeOut({
                kind: 'error',
                text: 'contact: mailer not configured. use the form in ~/contact or email MatthewRaymondWeinert@gmail.com',
            });
            return;
        }

        await typeOut({ kind: 'system', text: 'sending message…' });

        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    name,
                    email,
                    message,
                    to_email: 'MatthewRaymondWeinert@gmail.com',
                },
                { publicKey }
            );
            await typeOut({
                kind: 'output',
                text: `✓ message queued from ${name} <${email}>\nMatt will get back to you soon.`,
            });
        } catch (error) {
            await typeOut({
                kind: 'error',
                text: 'contact: send failed. try again or use the form in ~/contact',
            });
        }
    };

    const execute = async (raw) => {
        const input = raw.trim();
        if (!input || busy) return;

        pushInstant({ kind: 'input', text: input });
        setHistory((current) => (current[current.length - 1] === input ? current : [...current, input]));
        historyIndexRef.current = -1;
        draftBackupRef.current = '';

        const tokens = parseArgs(input);
        const command = (tokens[0] || '').toLowerCase();
        const args = tokens.slice(1);

        switch (command) {
            case 'help':
            case '?':
                await typeOut({
                    kind: 'output',
                    text: HELP_ROWS.map(([cmd, desc]) => `${pad(cmd, 18)}${desc}`).join('\n'),
                });
                break;

            case 'ls': {
                if (!args[0]) {
                    await typeOut({
                        kind: 'output',
                        text: SECTION_LIST.map((name) => (name === 'resume' ? 'resume.pdf' : `${name}/`)).join('  '),
                    });
                    break;
                }

                const listing = listSectionContents(args[0]);
                if (!listing) {
                    await typeOut({
                        kind: 'error',
                        text: `ls: cannot access '${args[0]}': no such section\ntry: ${SECTION_LIST.join('  ')}`,
                    });
                    break;
                }

                await typeOut({ kind: 'output', text: listing });
                break;
            }

            case 'pwd':
                await typeOut({ kind: 'output', text: '/mattweinert.com/~' });
                break;

            case 'cd': {
                if (!args[0] || args[0] === '~' || args[0] === '/') {
                    await typeOut({
                        kind: 'error',
                        text: 'cd: missing section\ntype ls to see available sections, then cd <section>',
                    });
                    break;
                }

                const result = resolveSection(args[0]);
                if (!result.ok) {
                    await typeOut({ kind: 'error', text: result.message });
                    break;
                }

                await typeOut({ kind: 'output', text: result.message });
                setBusy(true);
                await wait(1500);
                performNavigate(result);
                setBusy(false);
                window.setTimeout(() => inputRef.current?.focus(), 0);
                break;
            }

            case 'whoami':
                await typeOut({ kind: 'output', text: 'guest — welcome. make yourself at home.' });
                break;

            case 'about':
            case 'cat':
                await typeOut({
                    kind: 'output',
                    text: [
                        'Matt Weinert · Full Stack App Developer @ BNY',
                        'UCF B.S. Computer Engineering · Orlando, FL',
                        'Builds AI-powered Angular/Spring Boot apps, agents, and executive tools.',
                        'Earlier: training systems at 4c Strategies, Phoenix Defense, and Dignitas.',
                    ].join('\n'),
                });
                break;

            case 'stack':
            case 'skills':
                await typeOut({
                    kind: 'output',
                    text: [
                        'languages   Java  TypeScript  JavaScript  SQL  Python  Kotlin',
                        'frameworks  Spring Boot  Angular  Ionic  React  React Native',
                        'ai          Eliza  agents  LLM integration  prompt engineering  MCP',
                        'infra       GitLab CI/CD  Docker  Kubernetes  AWS',
                        'data        Oracle  MySQL  MongoDB',
                    ].join('\n'),
                });
                break;

            case 'experience':
            case 'exp':
                await typeOut({
                    kind: 'output',
                    text: [
                        'BNY                  Senior Associate — Full Stack App Developer   2023–Present',
                        '4c Strategies        Software Developer                            2022–2023',
                        'Phoenix Defense      Jr. Software Developer                        2021–2022',
                        'Dignitas Technologies Software Developer Intern                    2019–2020',
                        '',
                        'tip: cd experience',
                    ].join('\n'),
                });
                break;

            case 'projects':
                await typeOut({
                    kind: 'output',
                    text: [
                        ...portfolioItems
                            .filter((project) => project.featured)
                            .map((project) => {
                                const label = project.title.length > 12
                                    ? project.title.slice(0, 12)
                                    : project.title.padEnd(12, ' ');
                                return `${label} ${project.technologies.slice(0, 3).join(' · ')}`;
                            }),
                        '',
                        'tip: cd projects',
                    ].join('\n'),
                });
                break;

            case 'hobbies':
                await typeOut({
                    kind: 'output',
                    text: 'mountain biking · soccer · gym · wife/family/friends/dogs · teaching himself piano · always building apps',
                });
                break;

            case 'contact': {
                const flags = parseFlags(args);
                await runContact(flags);
                break;
            }

            case 'resume':
                window.open(resume, '_blank', 'noopener,noreferrer');
                await typeOut({ kind: 'output', text: 'opening resume.pdf …' });
                break;

            case 'github':
                window.open('https://github.com/MattRayWeinert', '_blank', 'noopener,noreferrer');
                await typeOut({ kind: 'output', text: 'opening github.com/MattRayWeinert …' });
                break;

            case 'linkedin':
                window.open('https://www.linkedin.com/in/matt-weinert/', '_blank', 'noopener,noreferrer');
                await typeOut({ kind: 'output', text: 'opening LinkedIn …' });
                break;

            case 'clear':
                abortTyping({ resetLines: true });
                setBusy(false);
                break;

            case 'echo':
                await typeOut({ kind: 'output', text: args.join(' ') || '' });
                break;

            case 'sudo':
                if (args.join(' ') === 'rm -rf /' || args.join(' ') === 'rm -rf /*') {
                    await typeOut({ kind: 'error', text: 'permission denied: nice try.' });
                } else {
                    await typeOut({ kind: 'error', text: 'sudo: guest is not in the sudoers file.' });
                }
                break;

            default:
                await typeOut({
                    kind: 'error',
                    text: `command not found: ${command}\ntype help for available commands`,
                });
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (busy) return;
        const value = draft;
        setDraft('');
        await execute(value);
    };

    const completeDraft = async () => {
        const value = draft;
        const parts = value.split(/\s+/);
        const last = parts[parts.length - 1] || '';
        const isFirst = parts.length <= 1 && !value.endsWith(' ');

        if (isFirst) {
            const matches = COMMANDS.filter((cmd) => cmd.startsWith(last.toLowerCase()));
            if (matches.length === 1) {
                setDraft(`${matches[0]}${matches[0] === 'cd' || matches[0] === 'contact' ? ' ' : ''}`);
            } else if (matches.length > 1 && !busy) {
                await typeOut({ kind: 'system', text: matches.join('  ') });
            }
            return;
        }

        if (parts[0]?.toLowerCase() === 'cd' || parts[0]?.toLowerCase() === 'ls') {
            const matches = SECTION_LIST.filter((section) => section.startsWith(last.toLowerCase()));
            if (matches.length === 1) {
                parts[parts.length - 1] = matches[0];
                setDraft(parts.join(' '));
            } else if (matches.length > 1 && !busy) {
                await typeOut({ kind: 'system', text: matches.join('  ') });
            }
        }

        if (parts[0]?.toLowerCase() === 'contact' && last.startsWith('-')) {
            const flagOpts = ['--name', '--email', '--message', '--help', '-n', '-e', '-m'];
            const matches = flagOpts.filter((flag) => flag.startsWith(last));
            if (matches.length === 1) {
                parts[parts.length - 1] = matches[0];
                setDraft(`${parts.join(' ')} `);
            } else if (matches.length > 1 && !busy) {
                await typeOut({ kind: 'system', text: matches.join('  ') });
            }
        }
    };

    const onKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            completeDraft();
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!history.length) return;
            if (historyIndexRef.current === -1) draftBackupRef.current = draft;
            const nextIndex = historyIndexRef.current === -1
                ? history.length - 1
                : Math.max(0, historyIndexRef.current - 1);
            historyIndexRef.current = nextIndex;
            setDraft(history[nextIndex]);
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndexRef.current === -1) return;
            const nextIndex = historyIndexRef.current + 1;
            if (nextIndex >= history.length) {
                historyIndexRef.current = -1;
                setDraft(draftBackupRef.current);
            } else {
                historyIndexRef.current = nextIndex;
                setDraft(history[nextIndex]);
            }
        }
    };

    const runShortcut = (command) => {
        if (busy) return;
        setDraft('');
        execute(command);
        inputRef.current?.focus();
    };

    return (
        <section className="assistant-shell" aria-labelledby="assistant-title">
            <div className="terminal-bar">
                <div className="terminal-lights" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
                <p id="assistant-title">guest@mattweinert:~</p>
                <span className="terminal-status"><i /> shell</span>
            </div>

            <div
                className="assistant-messages"
                ref={listRef}
                aria-live="polite"
                onClick={() => inputRef.current?.focus()}
            >
                {lines.map((line) => (
                    <div className={`term-line term-${line.kind}`} key={line.id}>
                        {line.kind === 'input' ? (
                            <p><span className="term-prompt">$</span> {line.text}</p>
                        ) : (
                            <pre>
                                {line.text}
                                {!line.complete && <span className="typing-caret" aria-hidden="true" />}
                            </pre>
                        )}
                    </div>
                ))}
            </div>

            <div className="term-shortcuts" aria-label="Command shortcuts">
                {SHORTCUTS.map((command) => (
                    <button
                        type="button"
                        key={command}
                        onClick={() => runShortcut(command)}
                        disabled={busy}
                    >
                        {command}
                    </button>
                ))}
            </div>

            <form className="assistant-input" onSubmit={onSubmit}>
                <span className="term-prompt">$</span>
                <input
                    ref={inputRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={busy ? 'typing…' : 'type a command — try help'}
                    aria-label="Terminal command"
                    autoComplete="off"
                    spellCheck="false"
                    disabled={busy}
                />
            </form>
        </section>
    );
};

export default PortfolioAssistant;
