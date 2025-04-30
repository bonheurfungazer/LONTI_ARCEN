import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      'react/no-unescaped-entities': 'off', // Désactiver cette règle
      '@next/next/no-page-custom-font': 'off', // Désactiver cette règle
      // Ajoutez d'autres règles que vous souhaitez désactiver ici
      'no-console': 'off', // Exemple : désactiver les avertissements pour console.log
      'no-unused-vars': 'off', // Exemple : désactiver les avertissements pour les variables non utilisées
    },
  }),
];

export default eslintConfig;
