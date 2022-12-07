import { useState } from 'react';
import './App.css';

const files = {
  children: [
    {
      name: 'node_modules',
      children: [
        {
          name: '.vite',
          children: [{ name: '.config' }, { name: 'default' }],
        },
        { name: 'ansi-styles' },
        { name: 'color-convert' },
        {
          name: 'emoji-regex',
          children: [{ name: 'node_modules', children: [{ name: 'gui' }] }],
        },
      ],
    },
    { name: 'main.tsx' },
    { name: 'index.css' },
    { name: 'App.css' },

    {
      name: 'package.json',
    },
    {
      name: 'vite.config.ts',
    },
    {
      name: 'tsconfig.json',
    },
    {
      name: 'yargs-parser',
      children: [{ name: 'node_modules' }, { name: 'package.json' }],
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[];
};

const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {entry.children ? (
        <button onClick={() => setIsExpanded(!isExpanded)} className="entry">
          {isExpanded ? '- ' : '+ '} {entry.name}
        </button>
      ) : (
        <div>{entry.name}</div>
      )}
      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 15}px` }}>
          {entry.children?.map((child) => (
            <Entry
              entry={child}
              depth={depth + 1}
              key={child.name + 'random'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      {files.children.map((entry) => (
        <Entry entry={entry} depth={1} key={entry.name + 'random'} />
      ))}
    </div>
  );
};

export default App;
