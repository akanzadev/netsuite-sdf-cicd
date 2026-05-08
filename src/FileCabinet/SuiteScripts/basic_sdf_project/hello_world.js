/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/log'], (log) => {
  /**
   * Executed after a record is loaded.
   * @param {Object} context
   * @param {record.Record} context.newRecord - The record being loaded
   * @param {string} context.type - The type of load action
   * @returns {void}
   */
  const beforeLoad = (context) => {
    log.debug({
      title: 'beforeLoad triggered',
      details: `Record type: ${context.newRecord.type}, ID: ${context.newRecord.id}`,
    });
  };

  /**
   * Executed before a record is submitted.
   * @param {Object} context
   * @param {record.Record} context.newRecord - The record being saved
   * @param {record.Record} context.oldRecord - The record before changes
   * @returns {void}
   */
  const beforeSubmit = (context) => {
    const newRecord = context.newRecord;
    const name = newRecord.getValue({ fieldId: 'altname' }) || newRecord.getValue({ fieldId: 'entityid' });

    log.audit({
      title: 'beforeSubmit triggered',
      details: `Saving record: ${name}`,
    });
  };

  return { beforeLoad, beforeSubmit };
});
