/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/log'], (log) => {
  const execute = (context) => {
    log.audit({
      title: 'ScheduledScript execute',
      details: `Invocation type: ${context.type}`,
    });
  };

  return { execute };
});
