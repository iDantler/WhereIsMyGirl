const EMAIL_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
};

if (typeof window !== 'undefined') {
  window.EMAIL_CONFIG = EMAIL_CONFIG;
}
