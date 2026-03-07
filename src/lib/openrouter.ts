interface ImageContent {
  type: "image_url";
  image_url: { url: string };
}

interface TextContent {
  type: "text";
  text: string;
}

type Content = ImageContent | TextContent;

interface Message {
  role: "system" | "user";
  content: string | Content[];
}

export async function identifyPerson(
  capturedPhotoBase64: string,
  familyMembers: { name: string; photoBase64s: string[] }[]
): Promise<{ name: string; confidence: number; explanation: string }> {
  if (familyMembers.length === 0) {
    return {
      name: "",
      confidence: 0,
      explanation: "No family members have been added yet.",
    };
  }

  const userContent: Content[] = [
    {
      type: "text",
      text: "Here is the photo of the person I want to identify:",
    },
    {
      type: "image_url",
      image_url: { url: capturedPhotoBase64 },
    },
    {
      type: "text",
      text: "Here are the family members to compare against:",
    },
  ];

  for (const member of familyMembers) {
    userContent.push({
      type: "text",
      text: `Family member name: "${member.name}"`,
    });
    // Limit to 2 photos per member for token efficiency
    for (const photo of member.photoBase64s.slice(0, 2)) {
      userContent.push({
        type: "image_url",
        image_url: { url: photo },
      });
    }
  }

  const messages: Message[] = [
    {
      role: "system",
      content: `You are a helpful assistant that identifies people by comparing photos.
You will receive a photo of a person and reference photos of family members.
Compare the person in the first photo against all the reference photos.
Return your answer as JSON with this exact format:
{"name": "the person's name or empty string if no match", "confidence": 0-100, "explanation": "brief explanation in simple, warm language"}

Rules:
- Be conservative with confidence scores
- Only give 70+ confidence if you are quite sure
- If no good match, return confidence 0 and empty name
- Use simple, friendly language in explanations
- Focus on facial features for comparison`,
    },
    {
      role: "user",
      content: userContent,
    },
  ];

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        temperature: 0.1,
        max_tokens: 500,
        response_format: { type: "json_object" },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No response from AI model");
  }

  const parsed = JSON.parse(content);
  return {
    name: parsed.name || "",
    confidence: Math.min(100, Math.max(0, Number(parsed.confidence) || 0)),
    explanation: parsed.explanation || "Could not determine a match.",
  };
}
