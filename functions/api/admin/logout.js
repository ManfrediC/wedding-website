import { handleAdminLogout, jsonResponse } from '../../_lib/rsvp.js';

export async function onRequestPost(context) {
  try {
    return await handleAdminLogout({
      request: context.request,
      env: context.env,
    });
  } catch (error) {
    console.error('rsvp_admin_logout_failed', error instanceof Error ? error.message : String(error));
    return jsonResponse({ ok: false, error: 'unexpected_error' }, 500);
  }
}

export function onRequest() {
  return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
}
