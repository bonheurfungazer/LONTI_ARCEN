import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      // Désactiver toutes les règles
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      'react-hooks/rules-of-hooks': 'off', // Désactiver les règles des hooks
      'react-hooks/exhaustive-deps': 'off', // Désactiver les dépendances des hooks
      'no-console': 'off', // Désactiver les avertissements pour console.log
      'no-unused-vars': 'off', // Désactiver les avertissements pour les variables non utilisées
      'no-undef': 'off', // Désactiver les erreurs pour les variables non définies
      'no-extra-semi': 'off', // Désactiver les erreurs pour les points-virgules supplémentaires
      // Ajoutez d'autres règles que vous souhaitez désactiver ici
    },
  }),
];

export default eslintConfig;
