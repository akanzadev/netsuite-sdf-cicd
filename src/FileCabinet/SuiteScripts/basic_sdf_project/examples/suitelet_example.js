/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget'], (serverWidget) => {
  const onRequest = (context) => {
    if (context.request.method === 'GET') {
      const form = serverWidget.createForm({
        title: 'Skeleton Suitelet Example',
      });
      form.addSubmitButton({ label: 'Submit' });
      context.response.writePage(form);
      return;
    }

    context.response.write('Suitelet POST received successfully');
  };

  return { onRequest };
});
