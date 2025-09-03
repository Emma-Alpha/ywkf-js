import { IApi } from '@4399ywkf/js';

export default (api: IApi) => {
  api.describe({
    config: {
      schema(Joi) {
        return Joi.alternatives().try(
          Joi.object().keys({
            slave: Joi.object(),
            master: Joi.object(),
            externalGarfish: Joi.boolean(),
          }),
          Joi.boolean().invalid(true),
        );
      },
    },
  });

  api.addRuntimePluginKey(() => ['garfish']);

  api.registerPlugins([
    require.resolve('./garfish/master'),
    require.resolve('./garfish/slave'),
  ]);
};
