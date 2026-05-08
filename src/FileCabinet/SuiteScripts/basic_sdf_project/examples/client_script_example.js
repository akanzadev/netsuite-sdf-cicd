/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/log'], (log) => {
  const pageInit = (context) => {
    log.debug({
      title: 'ClientScript pageInit',
      details: `Mode: ${context.mode}`,
    });
  };

  const saveRecord = (_context) => {
    log.audit({
      title: 'ClientScript saveRecord',
      details: 'Record passed client validation',
    });
    return true;
  };

  return { pageInit, saveRecord };
});
