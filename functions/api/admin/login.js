import { handleAdminLogin, jsonResponse } from '../../_lib/rsvp.js';

export async function onRequestPost(context) {
  try {
    return await handleAdminLogin({
      request: context.request,
      env: context.env,
    });
  } catch (error) {
    console.error('rsvp_admin_login_failed', error instanceof Error ? error.message : String(error));
    return jsonResponse({ ok: false, error: 'unexpected_error' }, 500);
  }
}

export function onRequest() {
  return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
}
