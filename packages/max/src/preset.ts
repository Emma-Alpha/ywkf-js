export default () => {
  return {
    plugins: [
      require.resolve('@4399ywkf/plugins/dist/access'),
      require.resolve('@4399ywkf/plugins/dist/analytics'),
      require.resolve('@4399ywkf/plugins/dist/antd'),
      require.resolve('@4399ywkf/plugins/dist/dva'),
      require.resolve('@4399ywkf/plugins/dist/initial-state'),
      require.resolve('@4399ywkf/plugins/dist/layout'),
      require.resolve('@4399ywkf/plugins/dist/locale'),
      require.resolve('@4399ywkf/plugins/dist/mf'),
      require.resolve('@4399ywkf/plugins/dist/model'),
      require.resolve('@4399ywkf/plugins/dist/moment2dayjs'),
      require.resolve('@4399ywkf/plugins/dist/qiankun'),
      require.resolve('@4399ywkf/plugins/dist/react-query'),
      require.resolve('@4399ywkf/plugins/dist/request'),
      require.resolve('@4399ywkf/plugins/dist/styled-components'),
      require.resolve('@4399ywkf/plugins/dist/tailwindcss'),
      require.resolve('@4399ywkf/plugins/dist/valtio'),
      require.resolve('./plugins/maxAlias'),
      require.resolve('./plugins/maxAppData'),
      require.resolve('./plugins/maxChecker'),
    ],
  };
};
