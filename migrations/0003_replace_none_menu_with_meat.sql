-- Replace the former default menu value without changing unrelated RSVP data.
UPDATE rsvp_responses
SET
  adults_json = replace(
    adults_json,
    '"dietaryRequirements":"None"',
    '"dietaryRequirements":"Meat"'
  ),
  children_json = replace(
    children_json,
    '"dietaryRequirements":"None"',
    '"dietaryRequirements":"Meat"'
  )
WHERE
  json_valid(adults_json)
  AND json_valid(children_json)
  AND (
    adults_json LIKE '%"dietaryRequirements":"None"%'
    OR children_json LIKE '%"dietaryRequirements":"None"%'
  );

-- Rebuild the derived summary so admin, CSV and email output matches per-guest data.
UPDATE rsvp_responses AS response
SET dietary_requirements = COALESCE(
  (
    SELECT group_concat(menu_item, '; ')
    FROM (
      SELECT
        0 AS guest_group,
        CAST(adult.key AS INTEGER) AS guest_index,
        json_extract(adult.value, '$.name')
          || ': '
          || json_extract(adult.value, '$.dietaryRequirements') AS menu_item
      FROM json_each(response.adults_json) AS adult
      WHERE
        adult.type = 'object'
        AND json_extract(adult.value, '$.name') <> ''
        AND json_extract(adult.value, '$.dietaryRequirements') NOT IN ('', 'None')

      UNION ALL

      SELECT
        1 AS guest_group,
        CAST(child.key AS INTEGER) AS guest_index,
        json_extract(child.value, '$.name')
          || CASE
            WHEN json_extract(child.value, '$.age') IS NULL THEN ''
            ELSE ' (' || json_extract(child.value, '$.age') || ')'
          END
          || ': '
          || json_extract(child.value, '$.dietaryRequirements') AS menu_item
      FROM json_each(response.children_json) AS child
      WHERE
        child.type = 'object'
        AND json_extract(child.value, '$.name') <> ''
        AND json_extract(child.value, '$.dietaryRequirements') NOT IN ('', 'None')

      ORDER BY guest_group, guest_index
    )
  ),
  ''
)
WHERE
  json_valid(adults_json)
  AND json_valid(children_json)
  AND NOT EXISTS (
    SELECT 1
    FROM json_each(adults_json)
    WHERE type <> 'object'
  )
  AND NOT EXISTS (
    SELECT 1
    FROM json_each(children_json)
    WHERE type <> 'object'
  );
