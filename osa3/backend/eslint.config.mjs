
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,            // Base ESLint recommended rules

  {
    files: ['**/*.js'],              // Apply to all JavaScript files  
    languageOptions: {      
      sourceType: 'commonjs',        // Use CommonJS module system
      globals: { ...globals.node },  // Node.js global variables
      ecmaVersion: 'latest',         // Support latest ECMAScript features
    },
    plugins: {                       // Enable stylistic plugin
      '@stylistic/js': stylisticJs,  // Stylistic rules for JavaScript
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],                      // 2-space indentation
      '@stylistic/js/linebreak-style': ['error', 'unix'],        // Unix line endings
      '@stylistic/js/quotes': ['error', 'single'],               // Single quotes for strings  
      '@stylistic/js/semi': ['error', 'never'],                  // No semicolons at line ends  

      eqeqeq: 'error',                                           // Enforce strict equality   
      'no-trailing-spaces': 'error',                             // No trailing spaces 
      'object-curly-spacing': ['error', 'always'],               // Spaces inside curly braces
      'arrow-spacing': ['error', { before: true, after: true }], // Spaces before/after arrow in arrow functions

      'no-console': 'off',                                       // Allow console statements          

      'no-undef': 'error',                                       // Disallow use of undeclared variables    
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],  // Disallow unused vars, ignore those starting with _
    },
  },

  {
    ignores: [                                                   // Files/folders to ignore         
      'dist/**',                                      
      'node_modules/**',
      '*.test.js',      // jos on testejä, jätä ne rauhaan
      'build/**',
    ],
  },
]
