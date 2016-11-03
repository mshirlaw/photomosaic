module.exports = {
    "extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 6
	},
    "rules": {
        "semi": ["error", "always"],
    },
        "env": {
        "browser": true,
        "node": true,
        "mocha": true
  },
  "globals": {
	   "Promise": false,
	   "TILE_WIDTH": true,
	   "TILE_HEIGHT": true,
	   "onmessage": true,
   }
};