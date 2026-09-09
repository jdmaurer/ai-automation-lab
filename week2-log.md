# Week 2 Log

## Wednesday 9.9.26 - Webhooks

Built Webhook Receiver in n8n. First workflow that runs without me pressing
Execute - Postman sends a POST, the workflow fires.

Webhook set to POST (sending data, not asking for it). Path changed from a
random string to coi-intake so the URL says what it does.

Incoming data arrives nested under "body" - so it's $json.body.client_name,
one level deeper than yesterday's expressions.

Generated a ticket ID with {{ "COI-" + $now.toMillis() }} - milliseconds
since 1970, so every ticket is unique without storing a counter.

Respond to Webhook node sends a real response back. Set the webhook's Respond
to "Using Respond to Webhook Node" first, or it replies immediately with a
generic message.

THREE THINGS THAT TRIPPED ME UP:
- "Listen for test event" only arms the webhook node. Once there were
  downstream nodes I had to use Execute Workflow to arm the whole thing.
- Respond to Webhook doesn't need a wire back to the trigger. n8n holds the
  caller's connection open until it answers.
- My first response returned the literal text {{ $json.ticket_id }} because
  the field was set to Fixed instead of Expression. Fixed sends text exactly
  as typed.

Test URL vs Production URL: test only listens while you're watching,
production runs silently once published.
