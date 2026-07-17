import { previewAdapters } from '@/src/lib/adapters/notConfigured';

it('never invents external data or a successful mutation', async () => {
  await expect(previewAdapters.account.getSnapshot()).resolves.toMatchObject({
    status: 'not-configured',
  });
  await expect(previewAdapters.connection.getSecret()).resolves.toMatchObject({
    status: 'not-configured',
  });
  await expect(
    previewAdapters.payment.beginCheckout({ quoteId: 'preview' }),
  ).resolves.toMatchObject({ status: 'not-configured' });
});
