/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/log'], (log) => {
  const get = (_requestParams) => {
    return {
      ok: true,
      message: 'RESTlet GET example',
    };
  };

  const post = (requestBody) => {
    log.audit({
      title: 'RESTlet POST',
      details: JSON.stringify(requestBody),
    });

    return {
      ok: true,
      received: requestBody || {},
    };
  };

  return { get, post };
});
