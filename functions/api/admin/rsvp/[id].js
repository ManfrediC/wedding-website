import { createD1RsvpStore, handleAdminDelete, jsonResponse } from '../../../_lib/rsvp.js';

export async function onRequestDelete(context) {
  try {
    return await handleAdminDelete({
      request: context.request,
      env: context.env,
      store: createD1RsvpStore(context.env.RSVP_DB),
      id: String(context.params.id ?? ''),
    });
  } catch (error) {
    console.error('rsvp_admin_delete_failed', error instanceof Error ? error.message : String(error));
    return jsonResponse({ ok: false, error: 'unexpected_error' }, 500);
  }
}

export function onRequest() {
  return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
}
