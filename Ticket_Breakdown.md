# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Task 1:

### Subject: Add field to store custom ID for agents

**Description:** Each Facility needs a way to store custom ID for Agents, create a field in the database schema to store it.

**Acceptance Criteria:**

- Database schema is updated with the new field for custom ID for agents
- Facilities can save the custom ID for all their Agents

**Time Estimate:** 3-4 hours

**Implementation Details:**

- Create a new field `custom_agent_id` in the Agents table
- Update backend to support this & the API endpoints

## Task 2:

### Subject: Add new field in UI Custom Agent ID in Agent creation & update form

**Description:** New new field in UI so facilities can assign custom agent ID for the agent's they are adding or updating.

**Acceptance Criteria:**

- Form to have Custom Agent ID field to store the custom ID for Agent
- Make the Custom Agent ID field required
- Validate it so only alphanumeric value can be entered & the length should be 10
- Show error if any validation is failed (required / alphanumeric / length)

**Time Estimate:** 5-7 hours

**Implementation Details:**

- Create a field with label Custom Agent ID in the Agent creation & update form
- Use `custom_agent_id` key to add or update the ID
- Add regex to validate the entered value if its alphanumeric & length is 10

## Task 3:

### Subject: Modify getShiftsByFacility function to support custom Agent ID

**Description:** Modify `getShiftsByFacility` function to fetch custom Agents ID while fetching Shift data

**Time Estimate:** 2-4 hours

**Acceptance Criteria:**

- `getShiftsByFacility` function should return custom Agent ID including other data it was already returning
- If custom ID for Agent is not found, functionality should not break, keep the custom Agent ID field empty/null. This will ensure that the old records will work in a similar way without breaking any functionality

**Implementation Details:**

- Update `getShiftsByFacility` function to include `custom_agent_id` in metadata
- If `custom_agent_id` is not found, keep `custom_agent_id` as empty/null

## Task 4:

### Subject: Modify generateReport function to include custom Agent ID

**Description:** Modify `generateReport` function to include Agent ID in the generated report for each Agent.

**Time Estimate:** 1-2 hours

**Acceptance Criteria:**

- Update the function to add custom Agent ID in the report

**Implementation Details:**

- Update the `generateReport` function to include `custom_agent_id` in PDF generated report which was received as metadata from shifts list returned by `getShiftsByFacility`

## Task 5:

### Subject: Test the custom Agent ID feature

**Description:** Test this new feature to make sure if custom ID is properly saved in the database & when fetched it's being shown in the PDF report

**Acceptance Criteria:**

- Create test cases to support this new feature
- Everything works as expected & no problems are found in existing functionality

**Time Estimate:** 3-4 hours

**Implementation Details:**

- Write unit tests to support the new feature
- Test new feature with unit tests & manually to ensure everything works as expected
