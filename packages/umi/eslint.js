try {
  require.resolve('@4399ywkf/lint/package.json');
} catch (err) {
  throw new Error('@4399ywkf/lint is not built-in, please install it manually before run umi lint.');
}

module.exports = process.env.LEGACY_ESLINT ? require('@4399ywkf/lint/dist/config/eslint/legacy') : require('@4399ywkf/lint/dist/config/eslint');
