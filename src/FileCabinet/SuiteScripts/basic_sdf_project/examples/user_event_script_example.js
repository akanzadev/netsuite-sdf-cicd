/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/log'], (log) => {
  const beforeLoad = (context) => {
    log.debug({
      title: 'UserEvent beforeLoad',
      details: `Record type: ${context.newRecord.type}, ID: ${context.newRecord.id}`,
    });
  };

  const beforeSubmit = (context) => {
    const recordObj = context.newRecord;
    const displayName = recordObj.getValue({ fieldId: 'altname' }) || recordObj.getValue({ fieldId: 'entityid' });

    log.audit({
      title: 'UserEvent beforeSubmit',
      details: `Saving record: ${displayName || '(no name)'}`,
    });
  };

  return { beforeLoad, beforeSubmit };
});
