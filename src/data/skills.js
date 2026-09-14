import javascriptIcon from '../assets/icons/javascript.svg';
import typescriptIcon from '../assets/icons/typescript.svg';
import phpIcon from '../assets/icons/php.svg';
import html5Icon from '../assets/icons/html5.svg';
import css3Icon from '../assets/icons/css3.svg';
import csharpIcon from '../assets/icons/csharp.svg';
import mongodbIcon from '../assets/icons/mongodb.svg';
import postgresqlIcon from '../assets/icons/postgresql.svg';
import awsIcon from '../assets/icons/aws.svg';

export const skillGroups = [
  {
    key: 'languages',
    items: [
      { name: 'JavaScript', icon: javascriptIcon },
      { name: 'HTML', icon: html5Icon },
      { name: 'CSS', icon: css3Icon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'PHP', icon: phpIcon },
      { name: 'C#', icon: csharpIcon },
    ],
  },
  {
    key: 'databases',
    items: [
      { name: 'SQL', icon: null },
      { name: 'MongoDB', icon: mongodbIcon },
      { name: 'PostgreSQL', icon: postgresqlIcon },
    ],
  },
  {
    key: 'cloud',
    items: [{ name: 'AWS', icon: awsIcon }],
  },
];
