# AvanteMove AI API
API to access the IA to generate inspirational phrases based on user beliefs or another required context. This software can be extended.

## Before Running Locally
At [.env.example](.env.example) you can find our environment variables. You need to set the value of:

**GOOGLE_GENERATIVE_AI_API_KEY**

Before running. You can generate a new API Key at [Google AI Studio](https://aistudio.google.com/).

After, you must copy and paste to the environment variable known here.

If you get it, we can the following steps.

## How To Run
If you've made the steps [here](#before-running-locally), you can run:

```commandline
npm run start
```

## Request Body
**ROUTE: POST**: `/api/v1/ai/inspire`

This route has a Request Body:

```json
{
  "beliefs": ["belief_1","belief_2"]
}
```

The list named **beliefs** is unlimited, BUT...

It can't be null or empty.

Each item can't contain:
1. consecutive spaces characters;
2. the max length is between 1 until 32.
   1. Else, it will THROWN an exception.

## Response Body
The response body SUCCESS:

Status Code: 200

```json
{
  "text": "your motivational phrase result and inspirational"
}
```

The response body ERROR:

Status Code: 400 | 500

```json
{
  "message": "your error message here"
}
```

---
*That's All Folks*
