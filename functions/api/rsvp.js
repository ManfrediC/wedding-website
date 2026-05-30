import { createD1RsvpStore, handleRsvpPost, jsonResponse } from '../_lib/rsvp.js';

export async function onRequestPost(context) {
  try {
    return await handleRsvpPost({
      request: context.request,
      env: context.env,
      store: createD1RsvpStore(context.env.RSVP_DB),
    });
  } catch (error) {
    console.error('rsvp_request_failed', error instanceof Error ? error.message : String(error));
    return jsonResponse({ ok: false, error: 'unexpected_error' }, 500);
  }
}

export function onRequest() {
  return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405);
}
