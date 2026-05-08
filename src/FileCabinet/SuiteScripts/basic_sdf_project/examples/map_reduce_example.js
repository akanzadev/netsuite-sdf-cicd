/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/log'], (log) => {
  const getInputData = () => {
    return [
      { id: '1', value: 'alpha' },
      { id: '2', value: 'beta' },
    ];
  };

  const map = (context) => {
    const row = JSON.parse(context.value);
    context.write({
      key: row.id,
      value: row.value,
    });
  };

  const reduce = (context) => {
    log.debug({
      title: `Reduce key: ${context.key}`,
      details: context.values.join(', '),
    });
  };

  const summarize = (summary) => {
    log.audit({
      title: 'Map/Reduce summary',
      details: `Usage: ${summary.usage}, Yields: ${summary.yields}`,
    });
  };

  return { getInputData, map, reduce, summarize };
});
