/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 * @NModuleScope SameAccount
 */
define(['N/log'], (log) => {
  const onAction = (context) => {
    const recordObj = context.newRecord;

    log.audit({
      title: 'WorkflowAction onAction',
      details: `Record type: ${recordObj.type}, ID: ${recordObj.id}`,
    });

    return 'OK';
  };

  return { onAction };
});
