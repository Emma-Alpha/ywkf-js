import { getAliasValue } from './getAliasValue';

test('get alias value: simple', () => {
  const alias = {
    react: '/react',
    'react-dom': '/react-dom',
    preact: '/preact/',
    umi$: '/umi',
    '@4399ywkf/utils': '/utils',
    '@4399ywkf/deps': '/deps/',
  } as const;
  const check = (v: string) => {
    return expect(getAliasValue({ alias, imported: v }));
  };

  check('react').toEqual('/react');
  check('react/jsx-runtime').toEqual('/react/jsx-runtime');

  check('react-dom').toEqual('/react-dom');
  check('react-dom/server').toEqual('/react-dom/server');
  check('react-dom/server/subpath').toEqual('/react-dom/server/subpath');

  check('preact').toEqual('/preact/');
  check('preact/subpath').toEqual('/preact/subpath');

  check('umi').toEqual('/umi');
  check('umi/subpath').toEqual(undefined);

  check('@4399ywkf/utils').toEqual('/utils');
  check('@4399ywkf/utils/subpath').toEqual('/utils/subpath');

  check('@4399ywkf/deps').toEqual('/deps/');
  check('@4399ywkf/deps/subpath').toEqual('/deps/subpath');
});

test('get alias value: circle', () => {
  const alias = {
    '@': 'react',
    react: 'preact/subpath',
    preact: '/preact',
    '@@/exports': 'umi',
  } as const;
  const check = (v: string) => {
    return expect(getAliasValue({ alias, imported: v }));
  };

  check('@').toEqual('react');
  check('@/subpath').toEqual('react/subpath');

  check('react').toEqual('preact/subpath');
  check('react/subpath').toEqual('preact/subpath/subpath');

  check('preact').toEqual('/preact');
  check('preact/subpath').toEqual('/preact/subpath');

  check('@@').toEqual(undefined);
  check('@@/exports').toEqual('umi');
  check('@@/exports/subpath').toEqual('umi/subpath');
});
